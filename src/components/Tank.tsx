import { PublicApi, Triplet, useCompoundBody } from "@react-three/cannon"
import { useFrame } from "@react-three/fiber"
import { tankBuild } from "@stats"

import { FC, MutableRefObject, useEffect } from "react"
import { Vector3 } from "three"

export const Tank: FC<{
	api?: MutableRefObject<PublicApi | undefined>
	lookAt?: MutableRefObject<{ pos: Vector3 } | undefined>
	position?: Triplet
}> = ({ api, lookAt, position }) => {
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
	}))

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
		<mesh ref={ref} position={position}>
			<group>
				<mesh castShadow receiveShadow>
					<sphereBufferGeometry args={tankBuild.body.args} />
					<meshStandardMaterial color={tankBuild.body.color} />
				</mesh>
				<mesh
					castShadow
					receiveShadow
					position={tankBuild.gun.position}
					rotation={tankBuild.gun.rotation}
				>
					<cylinderBufferGeometry args={tankBuild.gun.args} />
					<meshStandardMaterial color={tankBuild.gun.color} />
				</mesh>
				<pointLight position={[0, 10, 0]} castShadow intensity={0.4} />
			</group>
		</mesh>
	)
}
