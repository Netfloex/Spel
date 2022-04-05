import { useFrame } from "@react-three/fiber"

import { setCustomData } from "r3f-perf"
import { FC, useMemo } from "react"

import { Orb } from "@components"

import { useGame } from "@hooks"

import type { OrbProps } from "@typings/OrbProps"

export enum OrbType {
	square,
	triangle,
	hexagon,
}

export type LiveOrb = OrbProps & {
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
