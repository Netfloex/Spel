import type { FC } from "react"
import { CylinderBufferGeometry } from "three"

import { Orb } from "@components/orb"

export const Hexagon: FC<Orb> = (props) => (
	<Orb
		geometry={CylinderBufferGeometry}
		shapeType="Cylinder"
		args={[1, 1, 1, 6, 6]}
		color={0x536dfe}
		{...props}
	/>
)
