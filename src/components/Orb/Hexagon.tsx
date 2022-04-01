import { orbsBuild } from "@stats"

import { FC, memo } from "react"

import { Orb } from "@components/orb"

export const UnMemoizedHexagon: FC<Orb> = (props) => (
	<Orb
		shapeType="Cylinder"
		args={orbsBuild.hexagon.args}
		color={orbsBuild.hexagon.color}
		{...props}
	/>
)

export const Hexagon = memo(UnMemoizedHexagon)
