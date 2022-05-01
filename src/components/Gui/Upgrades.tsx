import { upgradesStats } from "@stats"

import styles from "./Upgrades.module.scss"

import type { FC } from "react"

import { useGameStats } from "@hooks"

export const Upgrades: FC = () => {
	const upgrades = useGameStats((state) => state.upgrades)

	return (
		<div className={styles.wrapper}>
			<div className={styles.upgrades}>
				{upgrades.map((upgrade, i) => (
					<div key={i} className={styles.upgradeWrapper}>
						<div className={styles.upgrade}>
							<div className={styles.upgradeBarWrapper}>
								{Array.from(
									{ length: upgradesStats.maxLevel },
									(_, i) => (
										<div
											key={i}
											className={styles.upgradeBar}
											style={
												upgrade.level > i
													? {
															backgroundColor:
																upgrade.color,
															marginLeft:
																i == 8
																	? "unset"
																	: undefined,
													  }
													: undefined
											}
										></div>
									),
								)}
							</div>
							<div className={styles.textWrapper}>
								<span>{upgrade.title}</span>
							</div>
						</div>
						<div
							className={styles.button}
							style={{ backgroundColor: upgrade.color }}
						>
							+
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
