import { tankStats } from "@stats"

import type { FC, MutableRefObject } from "react"
import { Mesh } from "three"

export const Tank: FC<{ meshRef?: MutableRefObject<Mesh> }> = ({ meshRef }) => {
	return (
		<mesh ref={meshRef} castShadow position={[0, 1, 0]}>
			<group>
				<mesh castShadow>
					<sphereBufferGeometry args={[tankStats.radius]} />
					<meshStandardMaterial color={tankStats.bodyColor} />
				</mesh>
				<mesh
					castShadow
					position={[
						0,
						0,
						tankStats.gunLength / 2 + tankStats.radius - 0.2,
					]}
					rotation={[-Math.PI / 2, 0, 0]}
				>
					<cylinderBufferGeometry
						args={[
							tankStats.gunRadius,
							tankStats.gunRadius,
							tankStats.gunLength,
						]}
					/>
					<meshStandardMaterial color={tankStats.gunColor} />
				</mesh>
				<pointLight position={[0, 10, 0]} castShadow />
			</group>
		</mesh>
	)
}
