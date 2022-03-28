import type { FC } from "react"

import { Bullet, useGame } from "@components"

export const Bullets: FC = () => {
	const bullets = useGame((state) => state.bullets)

	return (
		<>
			{bullets.map((bullet) => (
				<Bullet key={bullet.id} {...bullet} />
			))}
		</>
	)
}
