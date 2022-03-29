import { PublicApi, Triplet, useCompoundBody } from "@react-three/cannon"
import { useFrame } from "@react-three/fiber"
import { tankBuild, tankStats } from "@stats"

import type { FC } from "react"
import { MutableRefObject } from "react"
import { Vector3 } from "three"

// eslint-disable-next-line react/display-name
export const Tank: FC<{
	api?: MutableRefObject<PublicApi | undefined>
	lookAt?: MutableRefObject<{ pos: Vector3 } | undefined>
	position?: Triplet
}> = ({ api, lookAt, position = [0, 1, 0] }) => {
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

	useFrame(() => {
		if (lookAt && api && ref.current && lookAt.current) {
			ref.current.lookAt(lookAt.current.pos)

			api.current?.rotation.set(
				...(ref.current.rotation.toArray() as Triplet),
			)
		}
	})

	if (api) api.current = publicApi

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
