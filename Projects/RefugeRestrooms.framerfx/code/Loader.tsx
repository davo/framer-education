import * as React from 'react'
import {
	Frame,
	useAnimation,
	useMotionValue,
	addPropertyControls,
	ControlType,
	FrameProps,
} from 'framer'
import { TextInput } from './TextInput'
import { Icons_SearchLocation as SearchLocation } from './canvas'

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

interface Props extends FrameProps {
	tint: string
	accent: string
	size: number
	scale: string
}

export function Loader(props: Partial<Props>) {
	const { tint, size, scale, accent } = props

	const variants = {
		bounce: {
			y: -24,
			transition: {
				yoyo: Infinity,
			},
		},
	}

	return (
		<Frame
			{...props}
			size="100%"
			scale={scale}
			background="none"
			animate={'bounce'}
			variants={{
				bounce: {
					transition: {
						staggerChildren: 0.06,
					},
				},
			}}
		>
			<Frame
				key="come_on_1"
				borderRadius="100%"
				top={24}
				size={size}
				variants={variants}
				background={tint}
			/>
			<Frame
				key="come_on_2"
				borderRadius="100%"
				top={24}
				size={size}
				left={20}
				variants={variants}
				background={tint}
			/>
			<Frame
				key="come_on_3"
				borderRadius="100%"
				top={24}
				size={size}
				left={40}
				variants={variants}
				background={tint}
			/>
		</Frame>
	)
}

Loader.defaultProps = {
	tint: '#0177ff',
	accent: '#FFFFFF',
	width: 52,
	height: 44,
	size: 9,
}

// Set the component's property controls
addPropertyControls(Loader, {
	tint: {
		type: ControlType.Color,
		defaultValue: '#027aff',
		title: 'Tint',
	},
	accent: {
		type: ControlType.Color,
		defaultValue: '#FFFFFF',
		title: 'Accent',
	},
	scale: {
		type: ControlType.Number,
		min: 0,
		max: 2,
		step: 0.1,
		defaultValue: 1,
	},
})
