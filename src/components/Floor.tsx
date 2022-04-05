import { floorStats } from "@stats"

import type { FC } from "react"

export const Floor: FC = () => (
	<mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
		<planeBufferGeometry args={[floorStats.size, floorStats.size]} />
		<meshStandardMaterial color={floorStats.color} />
	</mesh>
)
