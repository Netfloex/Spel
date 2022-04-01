import { orbsBuild } from "@stats"

import { FC, memo } from "react"

import { Orb } from "@components/orb"

const UnMemoizedSquare: FC<Orb> = (props) => (
	<Orb
		shapeType="Box"
		args={orbsBuild.square.args}
		color={orbsBuild.square.color}
		{...props}
	/>
)

export const Square = memo(UnMemoizedSquare)
