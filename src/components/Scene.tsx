import { FC } from "react"

import { Floor, Orb, Player, Tank, useGame } from "@components"

export const Scene: FC = () => {
	const orbs = useGame((state) => state.orbs)
	return (
		<>
			<Tank />
			<Player />
			<Floor />

			{orbs.map((orb, i) => (
				<Orb {...orb} key={i} />
			))}
		</>
	)
}
