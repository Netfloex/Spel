import { ShapeType, useCompoundBody } from "@react-three/cannon"
import { useThree } from "@react-three/fiber"

import { FC, MutableRefObject } from "react"
import { BoxBufferGeometry, CylinderBufferGeometry, Mesh, Vector3 } from "three"

import { useGame } from "@components"

export interface Orb {
	startPos: Vector3
	orbRef: MutableRefObject<Mesh | null>
	id: number
}

type Geometries = typeof CylinderBufferGeometry | typeof BoxBufferGeometry

export const Orb: FC<
	Orb & {
		args: ConstructorParameters<Geometries>
		color: number
		geometry: Geometries
		shapeType: ShapeType
	}
> = ({ args, color, geometry, startPos, shapeType, id, orbRef }) => {
	const [killOrb, fadeBullet] = useGame((state) => [
		state.killOrb,
		state.fadeBullet,
	])

	const clock = useThree((state) => state.clock)

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
			linearDamping: 0.9,
			angularDamping: 0.9,
			linearFactor: [1, 0, 1],
			onCollide: ({ body }): void => {
				killOrb(id)
				fadeBullet(body.userData.id, clock.getElapsedTime())
			},
			userData: { id },
		}),
		orbRef,
	)

	return (
		<mesh
			ref={orbRef}
			castShadow
			position={startPos}
			geometry={new geometry(...(args as unknown[] as never[]))}
			name={`Orb ${id}`}
		>
			<meshStandardMaterial color={color} />
		</mesh>
	)
}
