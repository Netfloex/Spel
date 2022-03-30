import { orbsBuild } from "@stats"

import type { FC } from "react"

import { Orb } from "@components/orb"

export const Hexagon: FC<Orb> = (props) => (
	<Orb
		shapeType="Cylinder"
		args={orbsBuild.hexagon.args}
		color={orbsBuild.hexagon.color}
		{...props}
	/>
)
