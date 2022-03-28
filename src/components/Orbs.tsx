import type { FC } from "react"

import { useGame } from "@components"
import { Square, Triangle, Hexagon, Orb } from "@components/orb"

export enum OrbType {
	square,
	triangle,
	hexagon,
}

export type LiveOrb = Orb & {
	type: OrbType
}

export const Orbs: FC = () => {
	const orbs = useGame((state) => state.orbs)

	return (
		<>
			{orbs.map((orb) => {
				if (orb.type == OrbType.square)
					return <Square key={orb.id} {...orb} />
				if (orb.type == OrbType.triangle)
					return <Triangle key={orb.id} {...orb} />
				if (orb.type == OrbType.hexagon)
					return <Hexagon key={orb.id} {...orb} />
			})}
		</>
	)
}
