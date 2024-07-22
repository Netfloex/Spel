import { FC, useCallback, useEffect } from "react"
import { io, Socket } from "socket.io-client"

import { GameProvider, useCreateStore, useGame } from "@hooks"

import { ServerToClient, ClientToServer } from "@typings/Socket"

export const ManageSocket: FC = () => {
	const [setIO, destroyIO] = useGame((state) => [
		state.setIO,
		state.destroyIO,
	])

	useEffect(() => {
		const s: Socket<ServerToClient, ClientToServer> = io({
			transports: ["websocket", "polling"],
		})
		setIO(s)
		s.on("connect", () => console.log("connect"))
		s.on("connect_error", (err) => console.log("Connect Error:", err))
		s.on("disconnect", (reason) => console.log("Disconnected:", reason))
		s.onAny((...args) => console.log("EVENT", ...args))
		return () => {
			destroyIO()
		}
	}, [setIO, destroyIO])

	return null
}

export const ZustandProvider: FC = ({ children }) => {
	const store = useCreateStore()

	const createStore = useCallback(() => store, [store])

	return (
		<GameProvider createStore={createStore}>
			<ManageSocket />
			{children}
		</GameProvider>
	)
}
