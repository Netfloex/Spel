import { PublicApi, Triplet } from "@react-three/cannon"
import { useFrame } from "@react-three/fiber"
import { cameraStats, tankStats } from "@stats"

import { MutableRefObject, useCallback, useMemo, useRef } from "react"
import { Vector3 } from "three"

import { useKeyboard } from "@hooks"

export const useMovement = (
	player: MutableRefObject<PublicApi | undefined>,
	playerPos: MutableRefObject<Vector3 | undefined>,
): void => {
	const keyboard = useKeyboard()

	const velocity = useRef<Vector3>(new Vector3(0, 0, 0))
	const addedVelocityTemp = useMemo(() => new Vector3(), [])
	const zeroVectorTemp = useMemo(() => new Vector3(), [])

	const addVelocity = useCallback(
		(added: Triplet) => {
			velocity.current
				.add(
					addedVelocityTemp.fromArray(
						added.map((v) => v * tankStats.speedPerSecond),
					),
				)
				.clampLength(-tankStats.maxSpeed, tankStats.maxSpeed)
		},
		[addedVelocityTemp],
	)

	useFrame(({ camera }, delta) => {
		if (keyboard.current["a"]) addVelocity([-delta, 0, 0])
		if (keyboard.current["d"]) addVelocity([delta, 0, 0])
		if (keyboard.current["w"]) addVelocity([0, 0, -delta])
		if (keyboard.current["s"]) addVelocity([0, 0, delta])

		if (!playerPos.current || !player.current) return

		playerPos.current.add(velocity.current)

		velocity.current.lerp(zeroVectorTemp, tankStats.damping * delta)
		player.current.position.set(...playerPos.current.toArray())

		camera.position.copy(playerPos.current).setY(cameraStats.y)
	})
}
