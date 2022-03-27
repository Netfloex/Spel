import { useFrame } from "@react-three/fiber"
import { cameraStats } from "@stats"

import { FC, useRef } from "react"
import { useBullets } from "src/components/Player/useBullets"
import { useMovement } from "src/components/Player/useMovement"
import { Mesh } from "three"

import { Bullet, Tank } from "@components"

import { useMouse } from "@hooks"

export const Player: FC = () => {
	const player = useRef<Mesh>(null!)

	useMovement(player)
	const bullets = useBullets(player)

	const mouse = useMouse()

	useFrame((state) => {
		state.camera.position.copy(player.current.position).setY(cameraStats.y)

		player.current.lookAt(mouse.current.pos)
	})

	return (
		<>
			<Tank meshRef={player} />
			{bullets.map((bullet) => (
				<Bullet key={bullet.id} {...bullet} />
			))}
		</>
	)
}
