import { Triplet } from "@pmndrs/cannon-worker-api"

import {
	BoxBufferGeometry,
	CylinderBufferGeometry,
	SphereBufferGeometry,
} from "three"

type CylinderArgs = ConstructorParameters<typeof CylinderBufferGeometry>
type BoxArgs = ConstructorParameters<typeof BoxBufferGeometry>
type SphereArgs = ConstructorParameters<typeof SphereBufferGeometry>

export const tankStats = {
	secondsPerBullet: 1,
	radius: 1,
	gunLength: 0.9,
	gunInsideLength: 0.2,
	gunRadius: 0.5,
	speedPerSecond: 1,
	maxSpeed: 0.15,
	damping: 4,
}

export const tankBuild = {
	body: {
		color: 0x03a9f4,
		args: [tankStats.radius] as SphereArgs,
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
	speed: 0.3,
	damping: 2,
	secondsToLive: 10,
	fadeSeconds: 0.1,
}

export const bulletBuild = {
	args: [bulletStats.radius] as SphereArgs,
	color: 0x757575,
}

export const cameraStats = {
	y: 30,
}

export const floorStats = {
	color: 0x343434,
	size: 250,
}

export const orbStats = {
	damping: 0.9,
	angularDamping: 0.9,
	y: 1,
	fadeSeconds: 0.3,
	count: 250,
}

export const orbsBuild = {
	square: {
		args: [1.5, 1.5, 1.5] as BoxArgs,
		color: 0xff9800,
	},
	triangle: {
		args: [1, 1, 2, 3] as CylinderArgs,
		color: 0xf44336,
	},
	hexagon: {
		args: [1, 1, 2, 6, 6] as CylinderArgs,
		color: 0x536dfe,
	},
}
