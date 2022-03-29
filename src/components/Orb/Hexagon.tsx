import { orbsBuild } from "@stats"

import type { FC } from "react"
import { CylinderBufferGeometry } from "three"

import { Orb } from "@components/orb"

export const Hexagon: FC<Orb> = (props) => (
	<Orb
		geometry={CylinderBufferGeometry}
		shapeType="Cylinder"
		args={orbsBuild.hexagon.args}
		color={orbsBuild.hexagon.color}
		{...props}
	/>
)
