import { useFrame } from "@react-three/fiber"
import { bulletStats, tankStats } from "@stats"

import { MutableRefObject, useRef } from "react"
import { Mesh } from "three"

import { Bullet, useGame } from "@components"

import { useMouse } from "@hooks"

export type LiveBullet = Bullet & {
	built: number
	id: number
}

export const useBullets = (player: MutableRefObject<Mesh>): void => {
	const mouse = useMouse()

	const lastBullet = useRef(0)

	const [freshenBullets, addBullet] = useGame((state) => [
		state.freshenBullets,
		state.addBullet,
	])

	useFrame((state) => {
		const time = state.clock.getElapsedTime()

		if (
			mouse.current[0] &&
			state.clock.getElapsedTime() - lastBullet.current >
				tankStats.secondsPerBullet
		) {
			lastBullet.current = time
			const newBulletForce = mouse.current.pos
				.clone()
				.sub(player.current.position)
				.setLength(bulletStats.maxSpeed)
				.setY(0)

			addBullet({
				startPos: player.current.position
					.clone()
					.add(
						newBulletForce
							.clone()
							.setLength(
								tankStats.gunLength +
									tankStats.radius -
									bulletStats.radius,
							),
					),
				force: newBulletForce.clone(),
				time: lastBullet.current,
			})
		}

		freshenBullets(time)
	})
}
