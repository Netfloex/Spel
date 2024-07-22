import { useFrame } from "@react-three/fiber"
import { bulletBuild, bulletStats } from "@stats"

import { FC, useEffect, useMemo, useRef } from "react"
import {
	BufferGeometry,
	InstancedMesh,
	Mesh,
	Sphere,
	SphereGeometry,
	Vector3,
} from "three"

import { LiveBullet } from "@components/player"

import { useConstant, useGame, useGameApi, useGameStats } from "@hooks"

const getBoundingSphere = (geometry: BufferGeometry): Sphere => {
	if (geometry.boundingSphere) return geometry.boundingSphere
	geometry.computeBoundingSphere()
	return geometry.boundingSphere!
}

export const Bullets: FC = () => {
	const freshenBullets = useGame((state) => state.freshenBullets)

	const meshes = useRef<InstancedMesh>(null!)

	const geometry = useConstant(() => new SphereGeometry(...bulletBuild.args))
	const tempMesh = useMemo(() => new Mesh(geometry), [geometry])
	const zeroVector = useMemo(() => new Vector3(0, 0, 0), [])
	const tempDirectionVector = useMemo(() => new Vector3(), [])
	const bulletsRef = useRef<LiveBullet[]>([])

	const fadeOrb = useGame((state) => state.fadeOrb)
	const fadeBullet = useGame((state) => state.fadeBullet)
	const incScore = useGameStats((state) => state.incScore)
	const gameApi = useGameApi()

	useEffect(
		() =>
			gameApi.subscribe(({ bullets }) => {
				bulletsRef.current = bullets
			}),
		[gameApi, tempMesh],
	)

	useFrame(({ raycaster }, delta) => {
		freshenBullets()

		const bullets = bulletsRef.current
		if (!bullets) return

		bullets.forEach((bullet, i) => {
			bullet.position.add(bullet.force)
			bullet.force.lerp(zeroVector, bulletStats.damping * delta)

			tempMesh.position.copy(bullet.position)
			tempMesh.updateMatrix()

			meshes.current.setMatrixAt(i, tempMesh.matrix)

			//  Collision Detection:

			//  All orbs close enough to collide if the orbs were Spheres
			const closeOrbs = gameApi.getState().orbs.filter(
				(orb) =>
					orb.startPos.distanceTo(bullet.position) < // Distance orb to bullet, less than
						bulletStats.radius + // The bullets radius
							getBoundingSphere(orb.geometry).radius && // Plus the radius of the orb if it was a Sphere,
					!orb.fadingSince,
			)

			const collidable: Mesh[] = closeOrbs
				.map((e) => e.orbRef.current!)
				.filter(Boolean)

			if (collidable.length) {
				const originPoint = bullet.position
				const position = tempMesh.geometry.attributes.position

				for (
					let vertexIndex = 0;
					vertexIndex < position.array.length;
					vertexIndex++
				) {
					const directionVector = tempDirectionVector
						.fromBufferAttribute(position, vertexIndex)
						.applyMatrix4(tempMesh.matrix)
						.sub(tempMesh.position)

					const dirLength = directionVector.length()

					raycaster.set(originPoint, directionVector.normalize())
					const collisionResults =
						raycaster.intersectObjects(collidable)
					if (
						collisionResults.length > 0 &&
						collisionResults[0].distance < dirLength
					) {
						const faded = fadeOrb(
							collisionResults[0].object.userData?.id,
						)
						if (faded) fadeBullet(bullet.id)
						if (faded) bullet.force.lerp(zeroVector, 0.5)
						if (faded)
							incScore(
								collisionResults[0].object.userData?.points,
							)
						break
					}
				}
			}
		})
		meshes.current.count = bullets.length
		meshes.current.instanceMatrix.needsUpdate = true
	})

	return (
		<instancedMesh
			ref={meshes}
			args={[undefined, undefined, 1000]}
			castShadow
			receiveShadow
			geometry={geometry}
		>
			<meshStandardMaterial color={bulletBuild.color} transparent />
		</instancedMesh>
	)
}
