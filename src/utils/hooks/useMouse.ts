import { MutableRefObject, useRef } from "react"

import { useEventListener } from "@hooks"

type Mouse = Record<number, true>
export const useMouse = (): MutableRefObject<Mouse> => {
	const mouse = useRef<Mouse>({})

	useEventListener("mousedown", ({ button }) => {
		mouse.current[button] = true
	})

	useEventListener("mouseup", ({ button }) => {
		delete mouse.current[button]
	})

	return mouse
}
