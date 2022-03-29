import { useThree } from "@react-three/fiber"
import { bulletStats, floorStats, orbStats } from "@stats"

import { createRef, FC } from "react"
import { OrbType } from "src/components/Orbs"
import { Vector3 } from "three"
import create from "zustand"
import createContext from "zustand/context"

import { LiveOrb } from "@components"
import { LiveBullet } from "@components/player"

import { random } from "@utils"

type State = {
	bullets: LiveBullet[]
	bulletId: number

	addBullet: (bullet: {
		startPos: Vector3
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

const { Provider, useStore } = createContext<State>()
export const useGame = useStore

export const ZustandProvider: FC = ({ children }) => {
	const clock = useThree((state) => state.clock)
	return (
		<Provider
			// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
			createStore={() =>
				create<State>((set, get) => ({
					bullets: [],
					bulletId: 0,

					addBullet: ({ startPos, force, time }) =>
						set(({ bullets, bulletId }) => ({
							bulletId: bulletId + 1,
							bullets: [
								...bullets,
								{
									force,
									startPos,
									built: time,
									id: bulletId,
									bulletRef: createRef(),
								},
							],
						})),
					freshenBullets: (): void => {
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

					orbs: Array.from({ length: orbStats.count }, (_, id) => ({
						startPos: new Vector3(
							random(-floorStats.size / 2, floorStats.size / 2),
							orbStats.y,
							random(-floorStats.size / 2, floorStats.size / 2),
						),
						type: Math.round(
							random(OrbType.square, OrbType.hexagon),
						),
						id,
						orbRef: createRef(),
						fadingSince: false,
					})),
					freshenOrbs: (): void => {
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
					fadeOrb: (id): boolean => {
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
					fadeBullet: (id): void => {
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
				}))
			}
		>
			{children}
		</Provider>
	)
}
