import { ShapeType, useCompoundBody } from "@react-three/cannon"
import { orbStats } from "@stats"

import { FC, memo, MutableRefObject, useEffect } from "react"
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
	points: number
	args: ConstructorParameters<
		typeof CylinderBufferGeometry | typeof BoxBufferGeometry
	>
	color: number
	shapeType: ShapeType
}

const UnMemoizedOrb: FC<Orb> = ({
	args,
	color,
	geometry,
	startPos,
	shapeType,
	id,
	orbRef,
	points,
}) => {
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
			userData: { id, points },
		}),
		orbRef,
	)
	useEffect(() => console.log("Pw"))
	return (
		<mesh
			ref={orbRef}
			castShadow
			receiveShadow
			position={startPos}
			geometry={geometry}
			name={`Orb ${id}`}
		>
			<meshStandardMaterial color={color} transparent />
		</mesh>
	)
}

export const Orb = memo(UnMemoizedOrb)
