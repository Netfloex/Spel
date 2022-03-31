import { useFrame } from "@react-three/fiber"

import { FC, useMemo } from "react"

import { Hexagon, Orb, Square, Triangle } from "@components/orb"

import { useGame } from "@hooks"

export enum OrbType {
	square,
	triangle,
	hexagon,
}

export type LiveOrb = Orb & {
	type: OrbType
	fadingSince: number | false
}

export const Orbs: FC = () => {
	const [orbs, freshenOrbs] = useGame((state) => [
		state.orbs,
		state.freshenOrbs,
	])

	useFrame(() => {
		freshenOrbs()
	})

	const orbElements = useMemo(
		() =>
			orbs.map((orb) => {
				if (orb.type == OrbType.square)
					return <Square key={orb.id} {...orb} />
				if (orb.type == OrbType.triangle)
					return <Triangle key={orb.id} {...orb} />
				if (orb.type == OrbType.hexagon)
					return <Hexagon key={orb.id} {...orb} />
			}),
		[orbs],
	)

	return <>{orbElements}</>
}
