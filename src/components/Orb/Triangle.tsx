import { orbsBuild } from "@stats"

import type { FC } from "react"
import { CylinderBufferGeometry } from "three"

import { Orb } from "@components/orb"

export const Triangle: FC<Orb> = (props) => (
	<Orb
		geometry={CylinderBufferGeometry}
		shapeType="Cylinder"
		args={orbsBuild.triangle.args}
		color={orbsBuild.triangle.color}
		{...props}
	/>
)
