import type { FC } from "react"
import { Vector3 } from "three"

export enum OrbType {
	square,
	triangle,
	hexagon,
}

export interface Orb {
	startPos: Vector3
	type: OrbType
}

export const Orb: FC<Orb> = ({ startPos, type }) => {
	const shape =
		type == OrbType.square ? (
			<boxBufferGeometry args={[1.5, 1.5, 1.5]} />
		) : type == OrbType.hexagon ? (
			<cylinderBufferGeometry args={[1, 1, 1, 6, 6]} />
		) : type == OrbType.triangle ? (
			<cylinderBufferGeometry args={[1, 1, 1, 3]} />
		) : (
			new Error("Unknown Orb Type")
		)
	const color =
		type == OrbType.square
			? 0xff9800
			: type == OrbType.hexagon
			? 0x536dfe
			: type == OrbType.triangle
			? 0xf44336
			: 0x000

	return (
		<>
			<mesh castShadow position={startPos}>
				<meshStandardMaterial color={color} />
				{shape}
			</mesh>
		</>
	)
}
