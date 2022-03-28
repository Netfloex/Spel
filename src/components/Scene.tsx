import { FC } from "react"

import { Bullets, Floor, Orbs, Player, Tank } from "@components"

export const Scene: FC = () => (
	<>
		<Tank position={[5, 1, 5]} />
		<Player />
		<Floor />
		<Bullets />
		<Orbs />
	</>
)
