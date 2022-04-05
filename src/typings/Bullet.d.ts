import { MutableRefObject } from "react"
import { Mesh, SphereBufferGeometry, Vector3 } from "three"

export interface Bullet {
	position: Vector3
	bulletRef: MutableRefObject<Mesh | null>
	force: Vector3
	id: number
	geometry: SphereBufferGeometry
}
