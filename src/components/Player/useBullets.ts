import { useFrame } from "@react-three/fiber"
import { bulletStats, tankStats } from "@stats"
import type { Bullet } from "@typings/Bullet"

import { MutableRefObject, useRef } from "react"
import { Vector3 } from "three"

import { MouseRef, useGame } from "@hooks"

export type LiveBullet = Bullet & {
	built: number
}

export const useBullets = (
	playerPos: MutableRefObject<Vector3>,
	mouse: MouseRef,
): void => {
	const lastBullet = useRef(0)

	const addBullet = useGame((state) => state.addBullet)

	useFrame(({ clock }) => {
		if (!playerPos.current) return

		const time = clock.getElapsedTime()

		if (
			mouse.current[0] &&
			time - lastBullet.current > tankStats.secondsPerBullet
		) {
			lastBullet.current = time
			const newBulletForce = mouse.current.pos
				.clone()
				.sub(playerPos.current)
				.setLength(bulletStats.speed)

			addBullet({
				position: playerPos.current
					.clone()
					.add(
						newBulletForce
							.clone()
							.setLength(
								tankStats.gunLength -
									tankStats.gunInsideLength +
									tankStats.radius +
									bulletStats.radius -
									bulletStats.speed,
							),
					),
				force: newBulletForce,
				time: lastBullet.current,
			})
		}
	})
}
