import { PublicApi, Triplet } from "@react-three/cannon"
import { useFrame } from "@react-three/fiber"
import { cameraStats } from "@stats"

import { FC, useRef } from "react"

import { Tank } from "@components"
import { useBullets, useMovement } from "@components/player"

import { useMouse } from "@hooks"

export const Player: FC = () => {
	const api = useRef<PublicApi | undefined>(undefined)
	const mouse = useMouse()

	const playerPos = useRef<Triplet>([0, 0, 0])

	useMovement(api)
	useBullets(playerPos, mouse)

	useFrame(({ camera }) => {
		camera.position.fromArray(playerPos.current).setY(cameraStats.y)
	})

	return <Tank api={api} refPosition={playerPos} lookAt={mouse} />
}
