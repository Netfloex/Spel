import { useFrame } from "@react-three/fiber"

import { setCustomData } from "r3f-perf"
import { FC, useMemo } from "react"

import { Orb } from "@components/orb"

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
		setCustomData(orbs.length)
	})

	const orbElements = useMemo(
		() => orbs.map((orb) => <Orb key={orb.id} {...orb} />),
		[orbs],
	)

	return <>{orbElements}</>
}
