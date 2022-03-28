import { PublicApi, Triplet } from "@react-three/cannon"
import { useFrame } from "@react-three/fiber"
import { tankStats } from "@stats"

import { MutableRefObject, useCallback, useEffect, useRef } from "react"
import { clamp } from "three/src/math/MathUtils"

import { useKeyboard } from "@hooks"

export const useMovement = (
	player: MutableRefObject<PublicApi | undefined>,
): void => {
	const keyboard = useKeyboard()

	const velocity = useRef<Triplet>([0, 0, 0])
	useEffect(
		() =>
			player.current?.velocity.subscribe((vel) => {
				velocity.current = vel
			}),
		[player],
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

			player.current?.velocity.set(...velocity.current)
		},
		[player],
	)

	useFrame((state, delta) => {
		if (keyboard.current["a"]) addVelocity([-delta, 0, 0])
		if (keyboard.current["d"]) addVelocity([delta, 0, 0])
		if (keyboard.current["w"]) addVelocity([0, 0, -delta])
		if (keyboard.current["s"]) addVelocity([0, 0, delta])
	})
}
