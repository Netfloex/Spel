import { useSphere } from "@react-three/cannon"
import { bulletBuild, bulletStats } from "@stats"

import { FC, memo, MutableRefObject } from "react"
import { Mesh, SphereBufferGeometry, Vector3 } from "three"

import { useGame, useGameStats } from "@hooks"

export interface Bullet {
	startPos: Vector3
	bulletRef: MutableRefObject<Mesh | null>
	force: Vector3
	id: number
	geometry: SphereBufferGeometry
}

const UnMemoizedBullet: FC<Bullet> = ({
	startPos,
	force,
	bulletRef,
	id,
	geometry,
}) => {
	const [fadeOrb, fadeBullet] = useGame((state) => [
		state.fadeOrb,
		state.fadeBullet,
	])
	const incScore = useGameStats((state) => state.incScore)

	const [, api] = useSphere(
		() => ({
			isTrigger: true,
			args: [bulletStats.radius],
			position: startPos.toArray(),
			mass: 1,
			linearDamping: bulletStats.damping,
			velocity: force.toArray(),
			linearFactor: [1, 0, 1],
			userData: { id },

			onCollide: ({ body }): void => {
				if (!body?.name.startsWith("Orb")) return
				const faded = fadeOrb(body.userData.id)
				if (faded) fadeBullet(id)
				if (faded) api.velocity.set(0, 0, 0)
				if (faded) incScore(body.userData.points)
			},
		}),
		bulletRef,
	)

	return (
		<>
			<mesh
				castShadow
				ref={bulletRef}
				name={`Bullet ${id}`}
				geometry={geometry}
			>
				{/* <sphereBufferGeometry args={[bulletStats.radius]} /> */}
				<meshStandardMaterial color={bulletBuild.color} transparent />
			</mesh>
		</>
	)
}

export const Bullet = memo(UnMemoizedBullet)
