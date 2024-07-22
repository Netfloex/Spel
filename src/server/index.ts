import { createServer } from "http"
import { Server } from "socket.io"

import { ClientToServer, Players, ServerToClient } from "@typings/Socket"

const server = createServer()
const io = new Server<ClientToServer, ServerToClient>(server)
io.listen(6969)
console.log("Started")

const size = (): number => io.of("/").sockets.size

const players: Players = {}

io.on("connection", (socket) => {
	console.log(`${size()} Connected ${socket.id}`)
	socket.emit("players.set", players)
	socket.broadcast.emit("player.position", socket.id, [0, 1, 0])

	socket.on("disconnect", () => {
		console.log(`${size()} Disconnected ${socket.id}`)

		delete players[socket.id]
		socket.broadcast.emit("player.delete", socket.id)
	})

	socket.on("position", (position) => {
		players[socket.id] ??= {}

		players[socket.id]!.position = position
		console.log(players)

		socket.broadcast.emit("player.position", socket.id, position)
	})

	socket.on("rotation", (rotation) => {
		players[socket.id] ??= {}

		players[socket.id]!.rotation = rotation
		console.log(players)

		socket.broadcast.emit("player.rotation", socket.id, rotation)
	})
})
