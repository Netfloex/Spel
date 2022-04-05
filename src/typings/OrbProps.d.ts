import { MutableRefObject } from "react"
import { BufferGeometry, Mesh, Vector3 } from "three"

export interface OrbProps {
	startPos: Vector3
	orbRef: MutableRefObject<Mesh | null>
	id: number
	geometry: BufferGeometry
	points: number
	color: number
}
