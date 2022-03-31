import { useRef } from "react"

export const useConstant = <T>(fn: () => T): T => {
	const constantRef = useRef<T>()

	if (!constantRef.current) constantRef.current = fn()

	return constantRef.current
}
