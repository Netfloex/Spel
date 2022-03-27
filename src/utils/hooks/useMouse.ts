import { useFrame } from "@react-three/fiber"

import { MutableRefObject, useRef } from "react"
import { Vector3 } from "three"

import { useEventListener } from "@hooks"

type Mouse = { pos: Vector3 } & Record<number, true>
export const useMouse = (): MutableRefObject<Mouse> => {
	const mouse = useRef<Mouse>({ pos: new Vector3() })

	useFrame((state) => {
		mouse.current.pos
			.set(
				state.mouse.x * state.viewport.width,
				1,
				-state.mouse.y * state.viewport.height,
			)
			.add(state.camera.position)
			.setY(1)
	})

	useEventListener("mousedown", ({ button }) => {
		mouse.current[button] = true
	})

	useEventListener("mouseup", ({ button }) => {
		delete mouse.current[button]
	})

	return mouse
}
