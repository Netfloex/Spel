import createContext from "zustand/context"

import { State } from "@hooks"

const { Provider, useStore, useStoreApi } = createContext<State>()
export const useGame = useStore
export const useGameApi = useStoreApi
export const GameProvider = Provider
