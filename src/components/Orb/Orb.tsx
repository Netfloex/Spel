import { ShapeType, useCompoundBody } from "@react-three/cannon"
import { orbStats } from "@stats"

import { FC, MutableRefObject } from "react"
import {
	BoxBufferGeometry,
	BufferGeometry,
	CylinderBufferGeometry,
	Mesh,
	Vector3,
} from "three"

export interface Orb {
	startPos: Vector3
	orbRef: MutableRefObject<Mesh | null>
	id: number
	geometry: BufferGeometry
}

export const Orb: FC<
	Orb & {
		args: ConstructorParameters<
			typeof CylinderBufferGeometry | typeof BoxBufferGeometry
		>
		color: number
		shapeType: ShapeType
	}
> = ({ args, color, geometry, startPos, shapeType, id, orbRef }) => {
	useCompoundBody(
		() => ({
			shapes: [
				{
					type: shapeType,
					args,
				},
			],
			mass: 1,
			position: startPos.toArray(),
			linearDamping: orbStats.damping,
			angularDamping: orbStats.angularDamping,
			linearFactor: [1, 0, 1],
			isTrigger: true,
			userData: { id },
		}),
		orbRef,
	)

	return (
		<mesh
			ref={orbRef}
			castShadow
			position={startPos}
			geometry={geometry}
			name={`Orb ${id}`}
		>
			<meshStandardMaterial color={color} transparent />
		</mesh>
	)
}
