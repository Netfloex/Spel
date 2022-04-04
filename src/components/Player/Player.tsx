import { PublicApi } from "@react-three/cannon"

import { FC, useRef } from "react"
import { Vector3 } from "three"

import { Tank } from "@components"
import { useBullets, useMovement } from "@components/player"

import { useMouse } from "@hooks"

export const Player: FC = () => {
	const api = useRef<PublicApi | undefined>(undefined)
	const mouse = useMouse()

	const playerPos = useRef<Vector3>(new Vector3(0, 1, 0))

	useMovement(api, playerPos)
	useBullets(playerPos, mouse)

	return (
		<Tank position={playerPos.current.toArray()} api={api} lookAt={mouse} />
	)
}
