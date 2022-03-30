import { orbsBuild } from "@stats"

import type { FC } from "react"

import { Orb } from "@components/orb"

export const Triangle: FC<Orb> = (props) => (
	<Orb
		shapeType="Cylinder"
		args={orbsBuild.triangle.args}
		color={orbsBuild.triangle.color}
		{...props}
	/>
)
