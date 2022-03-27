import { useFrame } from "@react-three/fiber"
import { tankStats } from "@stats"

import { MutableRefObject } from "react"
import { Mesh, Vector3 } from "three"

import { useKeyboard } from "@hooks"

export const useMovement = (player: MutableRefObject<Mesh>): void => {
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

		player.current.userData.force.lerp(
			new Vector3(0, 0, 0),
			tankStats.friction,
		)

		player.current.userData.force.clampLength(-20, 20)
	})
}
