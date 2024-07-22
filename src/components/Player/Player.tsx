import { useFrame } from "@react-three/fiber"

import { FC, useRef } from "react"
import { Mesh } from "three"

import { Tank } from "@components"
import { useBullets, useMovement } from "@components/player"

import { useGame, useMouse } from "@hooks"

import { EulerArray } from "@typings/Socket"

export const Player: FC = () => {
	const playerRef = useRef<Mesh>(null)
	const mouse = useMouse()

	useMovement(playerRef)
	useBullets(playerRef, mouse)
	const io = useGame((state) => state.io)

	useFrame(() => {
		if (mouse?.current && playerRef?.current) {
			playerRef.current.lookAt(mouse.current.pos)
			io?.emit(
				"rotation",
				playerRef.current.rotation.toArray() as EulerArray,
			)
		}
	})
	return <Tank position={[0, 1, 0]} refMesh={playerRef} />
}
