import { useFrame } from "@react-three/fiber"
import { cameraStats, tankStats } from "@stats"

import { MutableRefObject, useCallback, useMemo, useRef } from "react"
import { Mesh, Vector3 } from "three"

import { useGame, useKeyboard } from "@hooks"

import { Triplet } from "@typings/Triplet"

export const useMovement = (playerRef: MutableRefObject<Mesh | null>): void => {
	const keyboard = useKeyboard()

	const velocity = useRef<Vector3>(new Vector3(0, 0, 0))
	const addedVelocityTemp = useMemo(() => new Vector3(), [])
	const zeroVectorTemp = useMemo(() => new Vector3(), [])
	const lastPlayerPosition = useRef(
		playerRef.current?.position ?? new Vector3(0, 0, 0),
	)

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
	const io = useGame((state) => state.io)

	useFrame(({ camera }, delta) => {
		if (keyboard.current["a"]) addVelocity([-delta, 0, 0])
		if (keyboard.current["d"]) addVelocity([delta, 0, 0])
		if (keyboard.current["w"]) addVelocity([0, 0, -delta])
		if (keyboard.current["s"]) addVelocity([0, 0, delta])

		if (!playerRef.current) return

		playerRef.current.position.add(velocity.current)

		velocity.current.lerp(zeroVectorTemp, tankStats.damping * delta)

		camera.position.copy(playerRef.current.position).setY(cameraStats.y)
		if (
			lastPlayerPosition.current.distanceTo(playerRef.current.position) >
			0.1
		) {
			io?.emit("position", playerRef.current.position.toArray())
			lastPlayerPosition.current.copy(playerRef.current.position)
		}
	})
}
