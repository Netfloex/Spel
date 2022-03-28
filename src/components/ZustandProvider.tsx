import { bulletStats, floorStats } from "@stats"

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

	freshenBullets: (time: number) => void

	orbs: LiveOrb[]
	killOrb: (id: number) => void
	fadeBullet: (id: number, time: number) => void
}

const { Provider, useStore } = createContext<State>()
export const useGame = useStore

export const ZustandProvider: FC = ({ children }) => {
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
					// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
					freshenBullets: (time) => {
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
							return set(() => ({
								bullets: freshBullets,
							}))
					},

					orbs: Array.from({ length: 50 }, (_, id) => ({
						startPos: new Vector3(
							random(-floorStats.size / 2, floorStats.size / 2),
							1,
							random(-floorStats.size / 2, floorStats.size / 2),
						),
						type: Math.round(
							random(OrbType.square, OrbType.hexagon),
						),
						id,
						orbRef: createRef(),
					})),
					killOrb: (id: number) =>
						set(({ orbs }) => ({
							orbs: orbs.filter((orb) => orb.id != id),
						})),
					fadeBullet: (id: number, time: number) =>
						set(({ bullets }) => ({
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
						})),
				}))
			}
		>
			{children}
		</Provider>
	)
}
