import { Triplet } from "@typings/Triplet"

export type EulerArray = [x: number, y: number, z: number, order?: string]

export interface Player {
	position?: Triplet
	rotation?: EulerArray
}
export type Players = Record<string, Player | undefined>

export interface ServerToClient {
	"player.position": (id: string, position: Triplet) => void
	"player.delete": (id: string) => void
	"players.set": (players: Players) => void
	"player.rotation": (id: string, rotation: EulerArray) => void
}
export interface ClientToServer {
	position: (position: Triplet) => void
	rotation: (rotation: EulerArray) => void
}
