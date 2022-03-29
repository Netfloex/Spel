import { orbsBuild } from "@stats"

import type { FC } from "react"
import { BoxBufferGeometry } from "three"

import { Orb } from "@components/orb"

export const Square: FC<Orb> = (props) => (
	<Orb
		geometry={BoxBufferGeometry}
		shapeType="Box"
		args={orbsBuild.square.args}
		color={orbsBuild.square.color}
		{...props}
	/>
)
