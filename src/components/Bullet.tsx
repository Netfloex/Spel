import { useSphere } from "@react-three/cannon"
import { bulletStats } from "@stats"

import { FC, MutableRefObject } from "react"
import { Mesh, Vector3 } from "three"

import { useGame, useGameStats } from "@hooks"

export interface Bullet {
	startPos: Vector3
	bulletRef: MutableRefObject<Mesh | null>
	force: Vector3
	id: number
}

export const Bullet: FC<Bullet> = ({ startPos, force, bulletRef, id }) => {
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
			<mesh castShadow ref={bulletRef} name={`Bullet ${id}`}>
				<sphereBufferGeometry args={[bulletStats.radius]} />
				<meshStandardMaterial color={bulletStats.color} transparent />
			</mesh>
		</>
	)
}
