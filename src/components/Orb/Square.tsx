import type { FC } from "react"
import { BoxBufferGeometry } from "three"

import { Orb } from "@components/orb"

export const Square: FC<Orb> = ({ startPos }) => {
	return (
		<Orb
			geometry={BoxBufferGeometry}
			shapeType="Box"
			args={[1.5, 1.5, 1.5]}
			color={0xff9800}
			startPos={startPos}
		/>
	)
}
