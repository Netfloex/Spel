import { Triplet } from "@pmndrs/cannon-worker-api"

import { BoxBufferGeometry, CylinderBufferGeometry } from "three"

type CylinderArgs = ConstructorParameters<typeof CylinderBufferGeometry>
type BoxArgs = ConstructorParameters<typeof BoxBufferGeometry>

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
		] as CylinderArgs,
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

export const orbStats = {
	damping: 0.9,
	angularDamping: 0.9,
	y: 0.5,
}

export const orbsBuild: Record<
	string,
	{
		args: BoxArgs | CylinderArgs
		color: number
	}
> = {
	square: {
		args: [1.5, 1.5, 1.5],
		color: 0xff9800,
	},
	triangle: {
		args: [1, 1, 1, 3],
		color: 0xf44336,
	},
	hexagon: {
		args: [1, 1, 1, 6, 6],
		color: 0x536dfe,
	},
}
