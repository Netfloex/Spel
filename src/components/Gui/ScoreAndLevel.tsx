import styles from "./ScoreAndLevel.module.scss"

import type { FC } from "react"

import { useGameStats } from "@hooks"

export const ScoreAndLevel: FC = () => {
	const [level, score] = useGameStats((state) => [state.level, state.score])

	return (
		<div className={styles.wrapper}>
			<div className={styles.gui}>
				<div className={styles.small}>
					<div className={styles.progress}>
						<div className={styles.textWrapper}>Score {score}</div>
						<div
							className={styles.bar}
							style={{
								width: Math.floor(level / 45) * 100 + "%",
							}}
						/>
					</div>
				</div>
				<div className={styles.progress}>
					<div className={styles.textWrapper}>
						Level {Math.floor(level)}
					</div>
					<div
						className={styles.bar}
						style={{
							width: (level % 1) * 100 + "%",
						}}
					/>
				</div>
			</div>
		</div>
	)
}
