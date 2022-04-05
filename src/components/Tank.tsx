import { useFrame } from "@react-three/fiber"
import { tankBuild } from "@stats"

import { FC, MutableRefObject } from "react"
import { Mesh, Vector3 } from "three"

import { Triplet } from "@typings/Triplet"

export const Tank: FC<{
	lookAt?: MutableRefObject<{ pos: Vector3 } | undefined>
	refMesh?: MutableRefObject<Mesh | null>
	position?: Triplet
}> = ({ lookAt, position, refMesh }) => {
	useFrame(() => {
		if (lookAt?.current && refMesh?.current) {
			refMesh.current.lookAt(lookAt.current.pos)
		}
	})

	return (
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
}
