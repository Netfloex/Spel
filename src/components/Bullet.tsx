import { useFrame } from "@react-three/fiber"
import { bulletStats } from "@stats"

import { FC, useRef } from "react"
import { Mesh, Vector3 } from "three"

export interface Bullet {
	startPos: Vector3
	force: Vector3
}

export const Bullet: FC<Bullet> = ({ startPos, force }) => {
	const bullet = useRef<Mesh>(null!)

	useFrame((state, delta) => {
		bullet.current.position.x += delta * force.x
		bullet.current.position.y += delta * force.y
		bullet.current.position.z += delta * force.z

		force.lerp(new Vector3(0, 0, 0), bulletStats.friction)
	})

	return (
		<>
			<mesh castShadow ref={bullet} position={startPos}>
				<sphereBufferGeometry args={[bulletStats.radius]} />
				<meshStandardMaterial color={bulletStats.color} />
			</mesh>
		</>
	)
}
