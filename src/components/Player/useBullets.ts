import { useFrame } from "@react-three/fiber"
import { bulletStats, tankStats } from "@stats"

import { MutableRefObject, useRef, useState } from "react"
import { Mesh } from "three"

import { Bullet } from "@components"

import { useMouse } from "@hooks"

type LiveBullet = Bullet & {
	built: number
	id: number
}

export const useBullets = (player: MutableRefObject<Mesh>): LiveBullet[] => {
	const mouse = useMouse()

	const [bullets, setBullets] = useState<LiveBullet[]>([])
	const bulletId = useRef(0)
	const lastBullet = useRef(0)

	useFrame((state) => {
		if (
			mouse.current[0] &&
			state.clock.getElapsedTime() - lastBullet.current >
				tankStats.secondsPerBullet
		) {
			lastBullet.current = state.clock.getElapsedTime()
			const newBulletForce = mouse.current.pos
				.clone()
				.sub(player.current.position)
				.setLength(bulletStats.maxSpeed)
				.setY(0)

			setBullets((bullets) => [
				...bullets,
				{
					force: newBulletForce.clone(),
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
					built: state.clock.getElapsedTime(),
					id: bulletId.current++,
				},
			])
		}

		const freshBullets = bullets.filter(
			(bullet) =>
				state.clock.getElapsedTime() - bullet.built <
				bulletStats.secondsToLive,
		)
		if (freshBullets.length != bullets.length) setBullets(freshBullets)
	})

	return bullets
}
