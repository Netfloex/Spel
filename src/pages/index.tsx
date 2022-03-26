import { Canvas } from "@react-three/fiber"

import { NextPage } from "next"

import { Scene } from "@components"

const Home: NextPage = () => (
	<Canvas shadows camera={{ position: [0, 10, 0] }}>
		<Scene />
	</Canvas>
)

export default Home
