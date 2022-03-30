import { orbsBuild } from "@stats"

import type { FC } from "react"

import { Orb } from "@components/orb"

export const Square: FC<Orb> = (props) => (
	<Orb
		shapeType="Box"
		args={orbsBuild.square.args}
		color={orbsBuild.square.color}
		{...props}
	/>
)
