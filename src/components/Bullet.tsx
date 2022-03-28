import { useSphere } from "@react-three/cannon"
import { bulletStats } from "@stats"

import { FC } from "react"
import { Vector3 } from "three"

export interface Bullet {
	startPos: Vector3
	force: Vector3
}

export const Bullet: FC<Bullet> = ({ startPos, force }) => {
	const [bullet] = useSphere(() => ({
		// isTrigger: true,
		args: [bulletStats.radius],
		position: startPos.toArray(),
		mass: 1,
		linearDamping: bulletStats.damping,
		velocity: force.toArray(),
		linearFactor: [1, 0, 1],
	}))

	return (
		<>
			<mesh castShadow ref={bullet}>
				<sphereBufferGeometry args={[bulletStats.radius]} />
				<meshStandardMaterial color={bulletStats.color} />
			</mesh>
		</>
	)
}
