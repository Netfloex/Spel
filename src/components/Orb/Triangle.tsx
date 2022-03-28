import type { FC } from "react"
import { CylinderBufferGeometry } from "three"

import { Orb } from "@components/orb"

export const Triangle: FC<Orb> = ({ startPos }) => {
	return (
		<Orb
			geometry={CylinderBufferGeometry}
			shapeType="Cylinder"
			args={[1, 1, 1, 3]}
			color={0xf44336}
			startPos={startPos}
		/>
	)
}
