import * as React from "react"
import {
    Frame,
    useCycle,
    FrameProps,
    addPropertyControls,
    ControlType,
    useTransform,
    motionValue,
    MotionValue,
    useMotionValue,
    transform,
} from "framer"
import { useScreenFrame } from "./hooks/UseScreenFrame"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

interface Props extends FrameProps {
    height: MotionValue<number>
    scrollHeight: MotionValue<number>
    contentHeight: MotionValue<number>
    scrollY: MotionValue<number>
    accent: string
    tint: string
    onScrollDrag: (scrollPoint: number, normal: number) => void
}

export function ScrollBar(props: Partial<Props>) {
    const {
        scrollHeight,
        contentHeight,
        scrollY,
        accent,
        tint,
        ...rest
    } = props

    const [containerRef, screenFrame] = useScreenFrame()

    const railWidth = useMotionValue(props.width as number)

    // Knob

    const border = 2
    const knobWidth = useTransform(railWidth, v => v - border * 2)
    const knobHeight = useTransform(props.height, v =>
        Math.max(v * (scrollHeight.get() / contentHeight.get()), 44)
    )

    const knobY = useTransform(
        scrollY,
        [0, -(contentHeight.get() - scrollHeight.get())],
        [0, props.height.get() - knobHeight.get()],
        { clamp: false }
    )

    // Event Handlers

    return (
        <Frame
            {...rest}
            width={railWidth}
            ref={containerRef}
            borderRadius={useTransform(knobWidth, v => v / 2)}
            background={tint}
            border={`${border}px solid ${tint}`}
            overflow="hidden"
        >
            <Frame
                y={knobY}
                width={knobWidth}
                height={knobHeight}
                borderRadius={useTransform(knobWidth, v => v / 2)}
                background={accent}
            />
        </Frame>
    )
}

ScrollBar.defaultProps = {
    height: 200,
    width: 8,
    scrollHeight: motionValue(200),
    contentHeight: motionValue(800),
    scrollY: motionValue(0),
    tint: "#1b8fc0",
    accent: "#FFFFFF",
}
