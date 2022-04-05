import { useThree } from "@react-three/fiber"
import {
	bulletBuild,
	bulletStats,
	floorStats,
	orbsBuild,
	orbStats,
} from "@stats"

import { createRef } from "react"
import {
	BoxBufferGeometry,
	CylinderBufferGeometry,
	SphereBufferGeometry,
	Vector3,
} from "three"
import create, { StoreApi, UseBoundStore } from "zustand"

import { LiveOrb, OrbType } from "@components"
import { LiveBullet } from "@components/player"

import { useConstant } from "@hooks"

import { random } from "@utils"

export interface State {
	bullets: LiveBullet[]
	bulletId: number

	addBullet: (bullet: {
		position: Vector3
		force: Vector3
		time: number
	}) => void

	freshenBullets: () => void

	orbs: LiveOrb[]
	freshenOrbs: () => void
	fadeOrb: (id: number) => boolean
	// killBullet: (id: number) => void
	fadeBullet: (id: number) => void
}

export const useCreateStore = (): (() => UseBoundStore<
	State,
	StoreApi<State>
>) => {
	const clock = useThree((state) => state.clock)
	return useConstant(
		() => () =>
			create<State>((set, get) => {
				const squareGeometry = new BoxBufferGeometry(
					...orbsBuild.square.args,
				)
				const triangleGeometry = new CylinderBufferGeometry(
					...orbsBuild.triangle.args,
				)
				const hexagonGeometry = new CylinderBufferGeometry(
					...orbsBuild.hexagon.args,
				)
				const bulletGeometry = new SphereBufferGeometry(
					...bulletBuild.args,
				)

				const state: State = {
					bullets: [],
					bulletId: 0,

					addBullet: ({ position, force, time }) =>
						set(({ bullets, bulletId }) => {
							bullets.push({
								force,
								position,
								built: time,
								id: bulletId,
								bulletRef: createRef(),
								geometry: bulletGeometry,
							})

							return {
								bulletId: bulletId + 1,
								bullets,
							}
						}),
					freshenBullets: () => {
						const time = clock.getElapsedTime()
						const { bullets }: { bullets: LiveBullet[] } = get()

						const freshBullets = bullets.filter(
							(bullet: LiveBullet) => {
								const timeAlive = time - bullet.built

								if (
									bullet.bulletRef.current &&
									bulletStats.secondsToLive - timeAlive <
										bulletStats.fadeSeconds &&
									!Array.isArray(
										bullet.bulletRef.current.material,
									)
								) {
									bullet.bulletRef.current.material.opacity =
										(bulletStats.secondsToLive -
											timeAlive) /
										bulletStats.fadeSeconds

									bullet.bulletRef.current.castShadow = false
								}
								return timeAlive < bulletStats.secondsToLive
							},
						)

						if (freshBullets.length != bullets.length)
							set(() => ({
								bullets: freshBullets,
							}))
					},

					orbs: Array.from({ length: orbStats.count }, (_, id) => {
						const type = Math.round(
							random(OrbType.square, OrbType.hexagon),
						)
						return {
							startPos: new Vector3(
								random(
									-floorStats.size / 2,
									floorStats.size / 2,
								),
								orbStats.y,
								random(
									-floorStats.size / 2,
									floorStats.size / 2,
								),
							),
							type,
							id,
							orbRef: createRef(),
							fadingSince: false,
							points: (type + 1) * 5,
							geometry:
								type == OrbType.square
									? squareGeometry
									: type == OrbType.triangle
									? triangleGeometry
									: type == OrbType.hexagon
									? hexagonGeometry
									: new SphereBufferGeometry(),
							args:
								type == OrbType.square
									? orbsBuild.square.args
									: type == OrbType.triangle
									? orbsBuild.triangle.args
									: type == OrbType.hexagon
									? orbsBuild.hexagon.args
									: [1],
							shapeType:
								type == OrbType.square
									? "Box"
									: type == OrbType.triangle
									? "Cylinder"
									: type == OrbType.hexagon
									? "Cylinder"
									: "Sphere",
							color:
								type == OrbType.square
									? orbsBuild.square.color
									: type == OrbType.triangle
									? orbsBuild.triangle.color
									: type == OrbType.hexagon
									? orbsBuild.hexagon.color
									: 0xffffff,
						}
					}),
					freshenOrbs: () => {
						const time = clock.getElapsedTime()
						const { orbs } = get()

						const newOrbs = orbs.filter((orb) => {
							if (
								orb.fadingSince &&
								orb.orbRef.current &&
								!Array.isArray(orb.orbRef.current.material)
							) {
								orb.orbRef.current.material.opacity =
									1 -
									(time - orb.fadingSince) /
										orbStats.fadeSeconds

								orb.orbRef.current.castShadow = false

								return orb.orbRef.current.material.opacity > 0
							} else return true
						})
						if (orbs.length != newOrbs.length)
							set({ orbs: newOrbs })
					},
					fadeOrb: (id) => {
						const time = clock.getElapsedTime()
						const { orbs } = get()
						const notFadingOrb = orbs.find(
							(orb) => orb.id == id && !orb.fadingSince,
						)

						if (!notFadingOrb) return false

						set(({ orbs }) => ({
							orbs: orbs.map((orb) => {
								if (orb != notFadingOrb) return orb

								return {
									...orb,
									fadingSince: time,
								}
							}),
						}))

						return true
					},
					// killBullet: (id) =>
					// 	set(({ bullets }) => ({
					// 		bullets: bullets.filter(
					// 			(bullet) => bullet.id != id,
					// 		),
					// 	})),
					fadeBullet: (id) => {
						const time = clock.getElapsedTime()
						return set(({ bullets }) => ({
							bullets: bullets.map((bullet) => {
								if (bullet.id != id) return bullet

								const newBuilt =
									time -
									bulletStats.secondsToLive +
									bulletStats.fadeSeconds

								if (newBuilt < bullet.built)
									return {
										...bullet,
										built: newBuilt,
									}

								return bullet
							}),
						}))
					},
				}

				return state
			}),
	)
}
