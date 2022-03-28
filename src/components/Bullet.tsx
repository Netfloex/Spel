import { useSphere } from "@react-three/cannon"
import { bulletStats } from "@stats"

import { FC, MutableRefObject } from "react"
import { Mesh, Vector3 } from "three"

export interface Bullet {
	startPos: Vector3
	bulletRef: MutableRefObject<Mesh | null>
	force: Vector3
	id: number
}

export const Bullet: FC<Bullet> = ({ startPos, force, bulletRef, id }) => {
	useSphere(
		() => ({
			// isTrigger: true,
			args: [bulletStats.radius],
			position: startPos.toArray(),
			mass: 1,
			linearDamping: bulletStats.damping,
			velocity: force.toArray(),
			linearFactor: [1, 0, 1],
			userData: { id },
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
