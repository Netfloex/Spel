import { useFrame } from "@react-three/fiber"

import { FC, useRef } from "react"
import { Mesh, Vector3 } from "three"

import { Floor } from "@components"

import { useKeyboard } from "@hooks"

export const Scene: FC = () => {
	const player = useRef<Mesh>(null!)
	// useOrbitControls()
	const keyboard = useKeyboard()

	useFrame((state, delta) => {
		player.current.userData.force ??= new Vector3()

		if (keyboard.current["a"])
			player.current.userData.force.x -= delta * 100
		if (keyboard.current["d"])
			player.current.userData.force.x += delta * 100
		if (keyboard.current["w"])
			player.current.userData.force.z -= delta * 100
		if (keyboard.current["s"])
			player.current.userData.force.z += delta * 100

		player.current.position.x += delta * player.current.userData.force.x
		player.current.position.z += delta * player.current.userData.force.z

		player.current.userData.force.lerp(new Vector3(0, 0, 0), 0.05)

		state.camera.position
			.copy(player.current.position)
			.add(new Vector3(0, 20, 0))
	})

	return (
		<>
			<ambientLight intensity={0.1} />
			<directionalLight position={[0, 5, 0]} />
			<mesh ref={player}>
				<boxBufferGeometry />
				<meshStandardMaterial />
			</mesh>
			<Floor />
		</>
	)
}
