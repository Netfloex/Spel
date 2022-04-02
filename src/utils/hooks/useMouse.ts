import { useFrame } from "@react-three/fiber"

import { MutableRefObject, useRef } from "react"
import { Vector3 } from "three"

import { useEventListener } from "@hooks"

type Mouse = { pos: Vector3 } & Record<number, true>
export type MouseRef = MutableRefObject<Mouse>
export const useMouse = (): MouseRef => {
	const mouse = useRef<Mouse>({ pos: new Vector3() })

	useFrame((state) => {
		mouse.current.pos
			.set(
				state.pointer.x * state.viewport.width,
				1,
				-state.pointer.y * state.viewport.height,
			)
			.add(state.camera.position)
			.setY(1)
	})

	useEventListener("pointerdown", ({ button }) => {
		mouse.current[button] = true
	})

	useEventListener("pointerup", ({ button }) => {
		delete mouse.current[button]
	})

	return mouse
}
