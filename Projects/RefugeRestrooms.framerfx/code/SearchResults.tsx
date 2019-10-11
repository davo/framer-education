import * as React from "react"
import {
    Frame,
    FrameProps,
    Scroll,
    Stack,
    motionValue,
    useTransform,
    useMotionValue,
} from "framer"
import { FiltersIcons } from "./FiltersIcons"
import { ScrollBar } from "./ScrollBar"
import { Results_Item as Item, Results_Header as Header } from "./canvas"
import { useScreenFrame } from "./hooks/UseScreenFrame"

interface Props extends FrameProps {
    tint: string
    accent: string
    selected: any
    places: any[]
    filters: {
        unisex: boolean
        accessible: boolean
        changing_table: boolean
    }
    onSelect: (value: any) => void
}

export function SearchResults(props: Partial<Props>) {
    const { tint, places, onSelect, ...rest } = props

    // We'll use these values to control the scroll bar
    const scrollY = useMotionValue(0)

    const [containerRef, containerFrame] = useScreenFrame()

    const scrollHeight = useMotionValue(props.height as number)
    const scrollWidth = useMotionValue(props.width as number)

    const contentWidth = useTransform(scrollWidth, v => Math.min(v, 500))
    const contentHeight = useMotionValue(places.length * 60 + 16)

    const scrollbarHeight = useTransform(scrollHeight, v => v - 40)

    return (
        <Frame
            ref={containerRef}
            background="#FFFFFF"
            shadow="0px 2px 8px 0px rgba(0, 0, 0, 0.24)"
            {...rest}
        >
            <Scroll
                center="x"
                width="100%"
                height="100%"
                overflow="hidden"
                contentOffsetY={scrollY}
            >
                <Stack
                    width="100%"
                    height="auto"
                    background="none"
                    distribution="start"
                    direction="vertical"
                    alignment="start"
                    gap={0}
                >
                    {places.map((place, index) => (
                        <Frame
                            width="1fr"
                            height={60}
                            background="none"
                            onTap={() => onSelect(place)}
                        >
                            <Item
                                key={`prediction_${index}`}
                                width={scrollWidth}
                                $placeName={place.name}
                            />
                            <FiltersIcons
                                center="y"
                                right={28}
                                unisex={place.unisex}
                                accessible={place.accessible}
                                changing_table={place.changing_table}
                            />
                        </Frame>
                    ))}
                </Stack>
            </Scroll>
            <Frame
                width="100%"
                height={32}
                bottom={0}
                background="linear-gradient(to top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%)"
            />
            <Frame height="100%" width={4} background={tint} />
            <ScrollBar
                width={10}
                height={scrollbarHeight}
                top={4}
                right={4}
                scrollY={scrollY}
                scrollHeight={scrollHeight}
                contentHeight={contentHeight}
                tint={"#CCCCCC"}
            />
        </Frame>
    )
}

SearchResults.defaultProps = {
    tint: "#0177ff",
    accent: "#FFFFFF",
    places: [],
    filters: [],
    predicting: false,
    onSelect: () => null,
}
