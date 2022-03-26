import type { FC, MutableRefObject } from "react"
import { Mesh } from "three"

export const Tank: FC<{ meshRef?: MutableRefObject<Mesh> }> = ({ meshRef }) => {
	const size = 1
	const gunLength = 1
	const gunRadius = 0.5

	return (
		<mesh ref={meshRef} castShadow position={[0, 1, 0]}>
			<group>
				<mesh castShadow>
					<sphereBufferGeometry args={[size]} />
					<meshStandardMaterial color={0x03a9f4} />
				</mesh>
				<mesh
					castShadow
					position={[0, 0, gunLength / 2 + size - 0.2]}
					rotation={[-Math.PI / 2, 0, 0]}
				>
					<cylinderBufferGeometry
						args={[gunRadius, gunRadius, gunLength]}
					/>
					<meshStandardMaterial color={0x9e9e9e} />
				</mesh>
			</group>
		</mesh>
	)
}
