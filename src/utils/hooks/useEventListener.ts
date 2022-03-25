import { useEffect } from "react"

export const useEventListener = <K extends keyof WindowEventMap>(
	eventName: K,
	listener: (ev: WindowEventMap[K]) => void,
): void => {
	useEffect(() => {
		addEventListener(eventName, listener)

		return (): void => {
			removeEventListener(eventName, listener)
		}
	}, [eventName, listener])
}
