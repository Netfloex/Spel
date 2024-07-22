import create from "zustand"

interface GameStats {
	score: number
	level: number
	incScore: (inc: number) => void
	upgrades: { title: string; level: number; color: string }[]
}
export const baseLog = (x: number, y: number): number =>
	Math.log(y) / Math.log(x)

// const levelToScore = (score: number): number => Math.pow(score, 3)
const scoreToLevel = (score: number): number => {
	const level = baseLog(3, score)
	return level < 1 ? 1 : level
}

const randomLevel = (): number => 0
export const useGameStats = create<GameStats>((set) => {
	const state: GameStats = {
		score: 0,
		level: 0,
		incScore: (inc) =>
			set(({ score }) => ({
				score: score + inc,
				level: scoreToLevel(score),
			})),
		upgrades: [
			{
				title: "Health Regen",
				level: randomLevel(),
				color: "lightsalmon",
			},
			{
				title: "Max Health",
				level: randomLevel(),
				color: "pink",
			},
			{
				title: "Body Damage",
				level: randomLevel(),
				color: "purple",
			},
			{
				title: "Bullet Speed",
				level: randomLevel(),
				color: "blue",
			},
			{
				title: "Bullet Penetration",
				level: randomLevel(),
				color: "yellow",
			},
			{
				title: "Bullet Damage",
				level: randomLevel(),
				color: "red",
			},
			{
				title: "Reload",
				level: randomLevel(),
				color: "green",
			},
			{
				title: "Movement Speed",
				level: randomLevel(),
				color: "cyan",
			},
		],
	}

	return state
})
