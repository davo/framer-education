import * as React from "react"
import {
    Frame,
    addPropertyControls,
    ControlType,
    FrameProps,
    Scroll,
    Stack,
} from "framer"
import { Loader } from "./Loader"
import { Search_Item as Item } from "./canvas"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

interface Props extends FrameProps {
    tint: string
    accent: string
    predictions: any[]
    predicting: boolean
    onSelect: (value: any) => void
}

export function SearchPredictions(props: Partial<Props>) {
    const { width, tint, predicting, predictions, onSelect } = props

    const hasPredictions = predictions.length > 0

    const placesContentHeight = predictions.length * 60 + 120
    const placesScrollHeight = Math.min(placesContentHeight, 440)
    const containerHeight = predicting ? 240 : 120 + placesScrollHeight
    const containerWidth = Math.min(width as number, 500)

    return (
        <Frame
            background="#FFFFFF"
            shadow="0px 2px 8px 0px rgba(0, 0, 0, 0.24)"
            center="x"
            width="100%"
            overflow="hidden"
            initial={{
                height: containerHeight,
                opacity: 0,
            }}
            animate={{
                height: containerHeight,
                opacity: hasPredictions ? 1 : 0,
            }}
            transition={{
                type: "tween",
                duration: 0.26,
            }}
        >
            {predicting && <Loader center="x" bottom={40} />}
            <Scroll
                height={placesScrollHeight}
                overflow="hidden"
                top={136}
                center="x"
                width={containerWidth}
            >
                {!predicting && (
                    <Stack
                        background="none"
                        direction="vertical"
                        width={containerWidth}
                        height={placesContentHeight}
                    >
                        {predictions.map((prediction, index) => (
                            <Item
                                width={containerWidth}
                                onClick={() => onSelect(prediction)}
                                $placeName={prediction.place_name}
                            />
                        ))}
                    </Stack>
                )}
            </Scroll>
            <Frame
                width="100%"
                height={32}
                bottom={0}
                background="linear-gradient(to top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%)"
            />
            <Frame height="100%" width={4} background={tint} />
        </Frame>
    )
}

SearchPredictions.defaultProps = {
    tint: "#0177ff",
    accent: "#FFFFFF",
    predictions: [],
    onSelect: () => null,
    heigh: 100,
    width: 375,
    predicting: true,
}
