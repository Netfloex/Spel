import type { FC } from "react"

export const Floor: FC = () => (
	<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
		<planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
		<meshStandardMaterial wireframe />
	</mesh>
)
