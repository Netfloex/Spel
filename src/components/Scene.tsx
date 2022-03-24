import { FC } from "react"

import { Floor } from "@components"

import { useOrbitControls } from "@hooks"

export const Scene: FC = () => {
	useOrbitControls()
	return (
		<>
			<ambientLight intensity={0.1} />
			<directionalLight position={[0, 5, 0]} />
			<mesh>
				<torusBufferGeometry />
				<meshStandardMaterial color={0xffffff} />
			</mesh>
			<Floor />
		</>
	)
}
