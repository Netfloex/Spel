import { Triplet } from "@pmndrs/cannon-worker-api"

export const tankStats = {
	secondsPerBullet: 1,
	radius: 1,
	gunLength: 0.9,
	gunInsideLength: 0.2,
	gunRadius: 0.5,
	speedPerSecond: 40,
	maxSpeed: 10,
	damping: 0.95,
}

export const tankBuild = {
	body: {
		color: 0x03a9f4,
		args: [tankStats.radius] as [radius: number],
	},
	gun: {
		color: 0x9e9e9e,
		args: [
			tankStats.gunRadius,
			tankStats.gunRadius,
			tankStats.gunLength,
		] as Triplet,
		rotation: [-Math.PI / 2, 0, 0] as Triplet,
		position: [
			0,
			0,
			tankStats.gunLength / 2 +
				tankStats.radius -
				tankStats.gunInsideLength,
		] as Triplet,
	},
}

export const bulletStats = {
	radius: 0.5,
	speed: 50,
	damping: 0.9,
	secondsToLive: 10,
	fadeSeconds: 1,
	color: 0x757575,
}

export const cameraStats = {
	y: 20,
}

export const floorStats = {
	color: 0x343434,
	size: 100,
}
