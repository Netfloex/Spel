import { Canvas } from "@react-three/fiber"

import { NextPage } from "next"

import { Scene, ZustandProvider } from "@components"

const Home: NextPage = () => (
	<Canvas shadows camera={{ position: [0, 10, 0] }}>
		<ZustandProvider>
			<Scene />
		</ZustandProvider>
	</Canvas>
)

export default Home
