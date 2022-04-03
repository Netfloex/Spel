import { useThree } from "@react-three/fiber"

import { useEffect } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export const useOrbitControls = (): void => {
	const { camera, gl } = useThree()
	useEffect(() => {
		const controls = new OrbitControls(camera, gl.domElement)
		controls.minDistance = 1
		controls.maxDistance = 2000
		return (): void => {
			controls.dispose()
		}
	}, [camera, gl])
}
