import { FC, useRef } from "react"
import { useBullets } from "src/components/Player/useBullets"
import { useMovement } from "src/components/Player/useMovement"
import { Mesh } from "three"

import { Bullet, Tank } from "@components"

export const Player: FC = () => {
	const player = useRef<Mesh>(null!)

	useMovement(player)
	const bullets = useBullets(player)

	return (
		<>
			<Tank meshRef={player} />
			{bullets.map((bullet) => (
				<Bullet key={bullet.id} {...bullet} />
			))}
		</>
	)
}
