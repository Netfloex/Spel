import styles from "./Gui.module.scss"

import type { FC } from "react"

import { useGameStats } from "@hooks"

export const Gui: FC = () => {
	const [level, score] = useGameStats((state) => [state.level, state.score])

	console.log(useGameStats())

	return (
		<div className={styles.wrapper}>
			<div className={styles.gui}>
				<div className={styles.text}>Score {score}</div>

				<div className={styles.progress}>
					<div className={styles.textWrapper}>
						Level {Math.floor(level)}
					</div>
					<div
						className={styles.bar}
						style={{ width: (level % 1) * 100 + "%" }}
					></div>
				</div>
			</div>
		</div>
	)
}
