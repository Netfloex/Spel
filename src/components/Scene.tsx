import { floorStats } from "@stats"

import { FC, useRef } from "react"
import { Vector3 } from "three"

import { Floor, Orb, Player, Tank } from "@components"

const random = (min: number, max: number): number =>
	Math.random() * (max - min) + min

export const Scene: FC = () => {
	const orbs = useRef<Orb[]>(
		Array.from({ length: 10 }, () => ({
			startPos: new Vector3(
				random(-floorStats.size / 2, floorStats.size / 2),
				1,
				random(-floorStats.size / 2, floorStats.size / 2),
			),
			type: Math.round(random(0, 2)),
		})),
	)

	return (
		<>
			<Tank />
			<Player />
			<Floor />

			{orbs.current.map((orb, i) => (
				<Orb {...orb} key={i} />
			))}
		</>
	)
}
