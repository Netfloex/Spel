import type { Canvas as CanvasType } from "@react-three/fiber"
import { cameraStats } from "@stats"

import { NextPage } from "next"
import dynamic from "next/dynamic"

import { Gui, Scene, ZustandProvider } from "@components"

const Canvas = dynamic(
	() => import("@react-three/fiber").then((fiber) => fiber.Canvas),
	{ ssr: false },
) as typeof CanvasType

const Home: NextPage = () => (
	<>
		<Canvas shadows camera={{ position: [0, cameraStats.y, 0] }}>
			<ZustandProvider>
				<Scene />
			</ZustandProvider>
		</Canvas>
		<Gui />
	</>
)

export default Home
