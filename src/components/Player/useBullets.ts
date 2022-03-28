import { Triplet } from "@pmndrs/cannon-worker-api"
import { useFrame } from "@react-three/fiber"
import { bulletStats, tankStats } from "@stats"

import { MutableRefObject, useMemo, useRef } from "react"
import { Vector3 } from "three"

import { Bullet, useGame } from "@components"

import { useMouse } from "@hooks"

export type LiveBullet = Bullet & {
	built: number
}

export const useBullets = (playerPos: MutableRefObject<Triplet>): void => {
	const playerVector = useMemo(() => new Vector3(), [])
	const mouse = useMouse()

	const lastBullet = useRef(0)

	const [freshenBullets, addBullet] = useGame((state) => [
		state.freshenBullets,
		state.addBullet,
	])

	useFrame((state) => {
		if (!playerPos.current) return
		playerVector.fromArray(playerPos.current)

		const time = state.clock.getElapsedTime()

		if (
			mouse.current[0] &&
			state.clock.getElapsedTime() - lastBullet.current >
				tankStats.secondsPerBullet
		) {
			lastBullet.current = time
			const newBulletForce = mouse.current.pos
				.clone()
				.sub(playerVector)
				.setLength(bulletStats.speed)

			addBullet({
				startPos: playerVector
					.clone()
					.add(
						newBulletForce
							.clone()
							.setLength(
								tankStats.gunLength +
									tankStats.radius +
									tankStats.gunInsideLength,
							),
					),
				force: newBulletForce.clone(),
				time: lastBullet.current,
			})
		}

		freshenBullets(time)
	})
}
