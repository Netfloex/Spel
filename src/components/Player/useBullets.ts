import { useFrame } from "@react-three/fiber"
import { bulletStats, cameraStats, tankStats } from "@stats"

import { MutableRefObject, useRef, useState } from "react"
import { Mesh, Vector3 } from "three"

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
		state.camera.position
			.copy(player.current.position)
			.add(new Vector3(0, cameraStats.y, 0))

		const mousePos = new Vector3(
			state.mouse.x * state.viewport.width,
			1,
			-state.mouse.y * state.viewport.height,
		)
			.add(state.camera.position)
			.setY(1)

		player.current.lookAt(mousePos.x, 1, mousePos.z)

		if (
			mouse.current[0] &&
			state.clock.getElapsedTime() - lastBullet.current >
				tankStats.secondsPerBullet
		) {
			lastBullet.current = state.clock.getElapsedTime()
			const newBulletForce = mousePos
				.clone()
				.sub(player.current.position)
				.setLength(bulletStats.maxSpeed)
				.setY(0)

			setBullets((bullets) => {
				return [
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
				]
			})
		}

		setBullets((bullets) => [
			...bullets.filter(
				(bullet) =>
					state.clock.getElapsedTime() - bullet.built <
					bulletStats.secondsToLive,
			),
		])
	})

	return bullets
}
