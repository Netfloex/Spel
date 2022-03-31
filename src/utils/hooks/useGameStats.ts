import create from "zustand"

interface GameStats {
	score: number
	level: number
	incScore: (inc: number) => void
}
export const baseLog = (x: number, y: number): number =>
	Math.log(y) / Math.log(x)

// const levelToScore = (score: number): number => Math.pow(score, 3)
const scoreToLevel = (score: number): number => baseLog(3, score)

export const useGameStats = create<GameStats>((set) => {
	const state: GameStats = {
		score: 0,
		level: 0,
		incScore: (inc) =>
			set(({ score }) => ({
				score: score + inc,
				level: scoreToLevel(score),
			})),
	}

	return state
})
