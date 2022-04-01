import styles from "./Scene.module.scss"

import { Perf } from "r3f-perf"
import { FC } from "react"

import { Bullets, Floor, Orbs, Player, Tank } from "@components"

export const Scene: FC = () => (
	<>
		<Tank position={[5, 1, 5]} />
		<Player />
		<Floor />
		<Bullets />
		<Orbs />
		<Perf
			showGraph={false}
			className={styles.performance}
			customData={{
				info: null as unknown as number,
				name: "Orbs" as unknown as number,
				value: 20,
			}}
		/>
	</>
)
