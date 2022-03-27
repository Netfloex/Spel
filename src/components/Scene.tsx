import { FC } from "react"

import { Floor, Player, Tank } from "@components"

export const Scene: FC = () => {
	return (
		<>
			<ambientLight intensity={0.1} />
			<directionalLight position={[0, 5, 0]} castShadow />
			<Tank />
			<Player />
			<Floor />
		</>
	)
}
