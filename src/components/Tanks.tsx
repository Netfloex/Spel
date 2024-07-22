import { useFrame } from "@react-three/fiber"
import { tankBuild } from "@stats"

import { FC, useEffect, useMemo, useRef } from "react"
import { InstancedMesh, Mesh, SphereGeometry } from "three"

import { useConstant, useGame } from "@hooks"

import { Players, EulerArray } from "@typings/Socket"
import { Triplet } from "@typings/Triplet"

export const Tanks: FC = () => {
	const meshes = useRef<InstancedMesh>(null!)

	const playersRef = useRef<Players>({})
	const io = useGame((state) => state.io)
	const geometry = useConstant(
		() => new SphereGeometry(...tankBuild.body.args),
	)
	const tempMesh = useMemo(() => new Mesh(geometry), [geometry])

	useEffect(() => {
		const onPlayerPos = (id: string, pos: Triplet): void => {
			playersRef.current[id] ??= {}
			playersRef.current[id]!.position = pos
		}

		const onPlayerRotation = (id: string, rotation: EulerArray): void => {
			playersRef.current[id] ??= {}
			playersRef.current[id]!.rotation = rotation
		}

		const onPlayerDelete = (id: string): void => {
			delete playersRef.current[id]
		}

		const onPlayersSet = (players: Players): void => {
			playersRef.current = players
		}

		io?.on("player.position", onPlayerPos)
		io?.on("player.rotation", onPlayerRotation)
		io?.on("player.delete", onPlayerDelete)
		io?.on("players.set", onPlayersSet)
		return () => {
			io?.off("player.position", onPlayerPos)
			io?.off("player.rotation", onPlayerRotation)
			io?.off("player.delete", onPlayerDelete)
			io?.off("players.set", onPlayersSet)
		}
	}, [io])

	useFrame(() => {
		const players = Object.entries(playersRef.current)
		meshes.current.count = players.length
		players.forEach(([, player], i) => {
			if (!player?.position || !player?.rotation) return
			tempMesh.position.set(...player.position)
			tempMesh.rotation.set(...player.rotation)
			tempMesh.updateMatrix()
			meshes.current.setMatrixAt(i, tempMesh.matrix)
		})
		meshes.current.instanceMatrix.needsUpdate = true
	})

	return (
		<>
			<instancedMesh
				ref={meshes}
				args={[undefined, undefined, 1000]}
				castShadow
				receiveShadow
				geometry={geometry}
			>
				<meshStandardMaterial color={tankBuild.body.color} />
			</instancedMesh>
		</>
	)
}
