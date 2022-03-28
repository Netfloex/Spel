import { ShapeType, useCompoundBody } from "@react-three/cannon"

import type { FC } from "react"
import { BoxBufferGeometry, CylinderBufferGeometry, Vector3 } from "three"

export interface Orb {
	startPos: Vector3
}

type Geometries = typeof CylinderBufferGeometry | typeof BoxBufferGeometry

export const Orb: FC<{
	args: ConstructorParameters<Geometries>
	color: number
	geometry: Geometries
	startPos: Vector3
	shapeType: ShapeType
}> = ({ args, color, geometry, startPos, shapeType }) => {
	const [ref] = useCompoundBody(() => ({
		shapes: [
			{
				type: shapeType,
				args,
			},
		],
		mass: 1,
		position: startPos.toArray(),
		linearDamping: 0.9,
		angularDamping: 0.9,
		linearFactor: [1, 0, 1],
	}))

	return (
		<mesh
			ref={ref}
			castShadow
			position={startPos}
			geometry={new geometry(...(args as unknown[] as never[]))}
		>
			<meshStandardMaterial color={color} />
		</mesh>
	)
}
