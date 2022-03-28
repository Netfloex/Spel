import { PublicApi, Triplet } from "@react-three/cannon"
import { useFrame } from "@react-three/fiber"
import { tankStats } from "@stats"

import { useCallback, useEffect, useRef } from "react"
import { clamp } from "three/src/math/MathUtils"

import { useKeyboard } from "@hooks"

export const useMovement = (player?: PublicApi): void => {
	const keyboard = useKeyboard()

	const velocity = useRef<Triplet>([0, 0, 0])
	useEffect(
		() => player?.velocity.subscribe((vel) => (velocity.current = vel)),
		[player?.velocity],
	)
	const addVelocity = useCallback(
		(added: Triplet) => {
			velocity.current = Array.from({ length: 3 }, (_, i) =>
				clamp(
					velocity.current[i] + added[i] * tankStats.speedPerSecond,
					-tankStats.maxSpeed,
					tankStats.maxSpeed,
				),
			) as Triplet

			player?.velocity.set(...velocity.current)
		},
		[player?.velocity],
	)

	useFrame((state, delta) => {
		if (keyboard.current["a"]) addVelocity([-delta, 0, 0])
		// player.applyForce([-delta * 1000, 0, 0], [0, 0, 0])
		// player.current.userData.force.x -= delta * 100
		if (keyboard.current["d"]) addVelocity([delta, 0, 0])
		// player.applyForce([delta * 1000, 0, 0], [0, 0, 0])

		// player.current.userData.force.x += delta * 100
		if (keyboard.current["w"]) addVelocity([0, 0, -delta])
		// player.applyForce([0, 0, -delta * 1000], [0, 0, 0])

		// player.current.userData.force.z -= delta * 100
		if (keyboard.current["s"]) addVelocity([0, 0, delta])
		// player.an([0, 0, delta * 1000], [0, 0, 0])
		// player.current.userData.force.z += delta * 100

		// player.current.position.x += delta * player.current.userData.force.x
		// player.current.position.z += delta * player.current.userData.force.z
		// player.current.userData.force.lerp(
		// 	new Vector3(0, 0, 0),
		// 	tankStats.friction,
		// )

		// player.current.userData.force.clampLength(-20, 20)
	})
}
