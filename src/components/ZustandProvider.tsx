import { FC } from "react"

import { GameProvider, useCreateStore } from "@hooks"

export const ZustandProvider: FC = ({ children }) => {
	const createStore = useCreateStore()

	return <GameProvider createStore={createStore}>{children}</GameProvider>
}
