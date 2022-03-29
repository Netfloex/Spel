import { ShapeType, useCompoundBody } from "@react-three/cannon"
import { orbStats } from "@stats"

import { FC, MutableRefObject, useEffect, useMemo } from "react"
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
	const [fadeOrb, fadeBullet] = useGame((state) => [
		state.fadeOrb,
		state.fadeBullet,
	])

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
			onCollide: ({ body }): void => {
				if (!body?.name.startsWith("Bullet")) return
				const faded = fadeOrb(id)
				if (faded) fadeBullet(body.userData.id)
			},
			userData: { id },
		}),
		orbRef,
	)

	const cachedGeometry = useMemo(
		() => new geometry(...(args as unknown[] as never[])),
		[geometry, args],
	)
	useEffect(() => console.log("rerender"))
	return (
		<mesh
			ref={orbRef}
			castShadow
			position={startPos}
			geometry={cachedGeometry}
			name={`Orb ${id}`}
		>
			<meshStandardMaterial color={color} transparent />
		</mesh>
	)
}
