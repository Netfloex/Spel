import { MutableRefObject, useRef } from "react"

import { useEventListener } from "@hooks"

type Keyboard = Record<string, true>

export const useKeyboard = (): MutableRefObject<Keyboard> => {
	const keyboard = useRef<Keyboard>({})

	useEventListener("keydown", ({ key }) => {
		keyboard.current[key.toLowerCase()] = true
	})

	useEventListener("keyup", ({ key }) => {
		delete keyboard.current[key.toLowerCase()]
	})

	return keyboard
}
