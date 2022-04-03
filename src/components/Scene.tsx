import { EffectComposer, Vignette } from "@react-three/postprocessing"

import styles from "./Scene.module.scss"

import { Perf } from "r3f-perf"
import { FC } from "react"

import { Bullets, Floor, Orbs, Player, Tank } from "@components"

export const Scene: FC = () => {
	return (
		<>
			<Tank position={[5, 1, 5]} />
			<Player />
			<Floor />
			<Bullets />
			<Orbs />
			<directionalLight args={[0xffffff, 0.8]} />
			<ambientLight args={[0xffffff, 0.2]} />
			<Perf
				showGraph={false}
				className={styles.performance}
				customData={{
					info: null as unknown as number,
					name: "Orbs" as unknown as number,
					value: 20,
				}}
			/>
			<EffectComposer>
				<Vignette eskil={false} offset={0.1} darkness={0.8} />
			</EffectComposer>
		</>
	)
}
