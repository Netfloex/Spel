import { orbsBuild } from "@stats"

import { FC, memo } from "react"

import { Orb } from "@components/orb"

export const UnMemoizedTriangle: FC<Orb> = (props) => (
	<Orb
		shapeType="Cylinder"
		args={orbsBuild.triangle.args}
		color={orbsBuild.triangle.color}
		{...props}
	/>
)

export const Triangle = memo(UnMemoizedTriangle)
