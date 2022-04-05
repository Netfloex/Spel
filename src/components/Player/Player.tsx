import { FC, useRef } from "react"
import { Mesh } from "three"

import { Tank } from "@components"
import { useBullets, useMovement } from "@components/player"

import { useMouse } from "@hooks"

export const Player: FC = () => {
	const playerRef = useRef<Mesh>(null)
	const mouse = useMouse()

	useMovement(playerRef)
	useBullets(playerRef, mouse)

	return <Tank refMesh={playerRef} lookAt={mouse} />
}
