import { FC, memo } from "react"

import type { OrbProps } from "@typings/OrbProps"

const UnMemoizedOrb: FC<OrbProps> = ({
	color,
	geometry,
	startPos,
	id,
	orbRef,
	points,
}) => (
	<mesh
		ref={orbRef}
		castShadow
		receiveShadow
		position={startPos}
		geometry={geometry}
		name={`Orb ${id}`}
		userData={{ id, points }}
	>
		<meshStandardMaterial color={color} transparent />
	</mesh>
)

export const Orb = memo(UnMemoizedOrb)
