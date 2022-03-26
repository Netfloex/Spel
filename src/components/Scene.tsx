import { FC } from "react"

import { Floor, Player } from "@components"

export const Scene: FC = () => {
	// useOrbitControls()

	return (
		<>
			<ambientLight intensity={0.1} />
			<directionalLight position={[0, 5, 0]} castShadow />
			<Player />
			<Floor />
		</>
	)
}
