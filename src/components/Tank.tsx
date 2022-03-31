import { PublicApi, Triplet, useCompoundBody } from "@react-three/cannon"
import { useFrame } from "@react-three/fiber"
import { tankBuild, tankStats } from "@stats"

import { FC, MutableRefObject, useEffect } from "react"
import { Vector3 } from "three"

// eslint-disable-next-line react/display-name
export const Tank: FC<{
	api?: MutableRefObject<PublicApi | undefined>
	lookAt?: MutableRefObject<{ pos: Vector3 } | undefined>
	position?: Triplet
	refPosition?: MutableRefObject<Triplet>
}> = ({ api, lookAt, position = [0, 1, 0], refPosition }) => {
	const [ref, publicApi] = useCompoundBody(() => ({
		shapes: [
			{
				type: "Sphere",
				...tankBuild.body,
			},
			{
				type: "Cylinder",
				...tankBuild.gun,
			},
		],
		position,
		isTrigger: true,
		mass: 10,
		angularDamping: 1,
		linearFactor: [1, 0, 1],

		linearDamping: tankStats.damping,
	}))

	useEffect(
		() =>
			refPosition &&
			publicApi.position.subscribe((val) => (refPosition.current = val)),
		[publicApi, refPosition],
	)

	useEffect(() => {
		if (api) api.current = publicApi
	}, [publicApi, api])

	useFrame(() => {
		if (lookAt?.current && ref.current) {
			ref.current.lookAt(lookAt.current.pos)
			publicApi.rotation.set(
				...(ref.current.rotation.toArray() as Triplet),
			)
		}
	})

	return (
		<mesh ref={ref} castShadow>
			<group>
				<mesh castShadow>
					<sphereBufferGeometry args={tankBuild.body.args} />
					<meshStandardMaterial color={tankBuild.body.color} />
				</mesh>
				<mesh
					castShadow
					position={tankBuild.gun.position}
					rotation={tankBuild.gun.rotation}
				>
					<cylinderBufferGeometry args={tankBuild.gun.args} />
					<meshStandardMaterial color={tankBuild.gun.color} />
				</mesh>
				<pointLight position={[0, 10, 0]} castShadow />
			</group>
		</mesh>
	)
}
