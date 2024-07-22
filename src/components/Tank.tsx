import { tankBuild } from "@stats"

import { FC, MutableRefObject } from "react"
import { Mesh } from "three"

import { Triplet } from "@typings/Triplet"

export const Tank: FC<{
	refMesh?: MutableRefObject<Mesh | null>
	position?: Triplet
}> = ({ position, refMesh }) => (
	<mesh ref={refMesh} position={position}>
		<group>
			<mesh castShadow receiveShadow>
				<sphereBufferGeometry args={tankBuild.body.args} />
				<meshStandardMaterial color={tankBuild.body.color} />
			</mesh>
			<mesh
				castShadow
				receiveShadow
				position={tankBuild.gun.position}
				rotation={tankBuild.gun.rotation}
			>
				<cylinderBufferGeometry args={tankBuild.gun.args} />
				<meshStandardMaterial color={tankBuild.gun.color} />
			</mesh>
			<pointLight position={[0, 10, 0]} castShadow intensity={0.4} />
		</group>
	</mesh>
)
