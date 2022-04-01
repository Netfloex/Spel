import { useFrame } from "@react-three/fiber"

import { FC, useMemo } from "react"

import { Bullet } from "@components"

import { useGame } from "@hooks"

export const Bullets: FC = () => {
	const [bullets, freshenBullets] = useGame((state) => [
		state.bullets,
		state.freshenBullets,
	])

	useFrame(() => {
		freshenBullets()
	})

	const bulletElements = useMemo(
		() => bullets.map((bullet) => <Bullet key={bullet.id} {...bullet} />),
		// Also add bullets.length because that's when we need to update
		// To remove or add existing bullets
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[bullets, bullets.length],
	)

	return <>{bulletElements}</>
}
