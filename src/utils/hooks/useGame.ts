import createContext from "zustand/context"

import { State } from "@hooks"

const { Provider, useStore } = createContext<State>()
export const useGame = useStore
export const GameProvider = Provider
