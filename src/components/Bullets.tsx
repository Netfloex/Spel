import { useFrame } from "@react-three/fiber"

import type { FC } from "react"

import { Bullet, useGame } from "@components"

export const Bullets: FC = () => {
	const [bullets, freshenBullets] = useGame((state) => [
		state.bullets,
		state.freshenBullets,
	])

	useFrame(() => {
		freshenBullets()
	})

	return (
		<>
			{bullets.map((bullet) => (
				<Bullet key={bullet.id} {...bullet} />
			))}
		</>
	)
}
