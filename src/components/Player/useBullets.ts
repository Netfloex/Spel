import { useFrame } from "@react-three/fiber"
import { bulletStats, tankStats } from "@stats"

import { MutableRefObject, useRef } from "react"
import { Mesh } from "three"

import { MouseRef, useGame } from "@hooks"

import type { Bullet } from "@typings/Bullet"

export type LiveBullet = Bullet & {
	built: number
}

export const useBullets = (
	playerRef: MutableRefObject<Mesh | null>,
	mouse: MouseRef,
): void => {
	const lastBullet = useRef(0)

	const addBullet = useGame((state) => state.addBullet)

	useFrame(({ clock }) => {
		if (!playerRef.current) return

		const time = clock.getElapsedTime()

		if (
			mouse.current[0] &&
			time - lastBullet.current > tankStats.secondsPerBullet
		) {
			lastBullet.current = time
			const newBulletForce = mouse.current.pos
				.clone()
				.sub(playerRef.current.position)
				.setLength(bulletStats.speed)

			addBullet({
				position: playerRef.current.position
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
