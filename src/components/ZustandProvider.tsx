import { bulletStats, floorStats } from "@stats"

import type { FC } from "react"
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
								},
							],
						})),
					// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
					freshenBullets: (time) => {
						const bullets = get().bullets
						const freshBullets = bullets.filter(
							(bullet) =>
								time - bullet.built < bulletStats.secondsToLive,
						)
						if (freshBullets.length != bullets.length)
							return set(() => ({
								bullets: freshBullets,
							}))
					},

					orbs: Array.from({ length: 10 }, () => ({
						startPos: new Vector3(
							random(-floorStats.size / 2, floorStats.size / 2),
							1,
							random(-floorStats.size / 2, floorStats.size / 2),
						),
						type: Math.round(
							random(OrbType.square, OrbType.hexagon),
						),
					})),
				}))
			}
		>
			{children}
		</Provider>
	)
}
