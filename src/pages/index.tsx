import { Physics } from "@react-three/cannon"
import { Canvas } from "@react-three/fiber"
import { cameraStats } from "@stats"

import { NextPage } from "next"

import { Gui, Scene, ZustandProvider } from "@components"

const Home: NextPage = () => (
	<>
		<Canvas
			mode="concurrent"
			shadows
			camera={{ position: [0, cameraStats.y, 0] }}
		>
			<Physics gravity={[0, 0, 0]}>
				<ZustandProvider>
					<Scene />
				</ZustandProvider>
			</Physics>
		</Canvas>
		<Gui />
	</>
)

export default Home
