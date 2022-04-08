import { ScoreAndLevel } from "./ScoreAndLevel"
import { Upgrades } from "./Upgrades"

import type { FC } from "react"

export const Gui: FC = () => (
	<>
		<ScoreAndLevel />
		<Upgrades />
	</>
)
