import { useFrame } from "@react-three/fiber"

import type { FC } from "react"
import { useRef } from "react"
import { Mesh, Vector3 } from "three"

import { Tank } from "@components"

import { useKeyboard } from "@hooks"

export const Player: FC = () => {
	const mouse = useRef<Mesh>(null!)
	const player = useRef<Mesh>(null!)

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

		const mousePos = new Vector3(
			state.mouse.x * state.viewport.width, //
			0,
			-state.mouse.y * state.viewport.height,
		).add(state.camera.position)

		mouse.current.position.copy(mousePos)

		player.current.lookAt(mousePos.x, 1, mousePos.z)
	})
	return (
		<>
			<Tank meshRef={player} />
			<Tank />
			<mesh ref={mouse}>
				<sphereBufferGeometry args={[0.2]} />
				<meshStandardMaterial color={"orange"} />
			</mesh>
		</>
	)
}
