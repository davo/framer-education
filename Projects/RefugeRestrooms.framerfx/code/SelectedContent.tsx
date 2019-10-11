import * as React from "react"
import { Frame, Scroll, Stack, addPropertyControls, ControlType } from "framer"
import { FiltersIcons } from "./FiltersIcons"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

type Props = {
    name: string
    street: string
    changing_table: boolean
    unisex: boolean
    accessible: boolean
    directions: string
    comment: string
}

export function SelectedContent(props) {
    const {
        placeName,
        street,
        changing_table,
        unisex,
        accessible,
        directions,
        distance,
        comment,
        ...rest
    } = props

    if (!placeName) {
        return <div />
    }

    return (
        <Scroll {...rest} direction="vertical">
            <Stack
                direction="vertical"
                distribution="start"
                alignment="start"
                width="100%"
                height="auto"
                style={{
                    fontFamily: "Avenir Next",
                    fontSize: 16,
                    color: "#001a38",
                    padding: 24,
                    background: "#FFF",
                }}
            >
                <h1 style={{ fontWeight: 600, marginTop: 0, marginBottom: 4 }}>
                    {placeName}
                </h1>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 0 }}>
                    {street} ({distance.toFixed(1) + "miles"})
                </h3>
                <FiltersIcons
                    unisex={unisex}
                    changing_table={changing_table}
                    accessible={accessible}
                    width={70}
                    height={18}
                    style={{ position: "relative", marginBottom: 28 }}
                />
                {directions.length > 0 && (
                    <div>
                        <h4 style={{ fontWeight: 600, color: "#446892" }}>
                            Directions
                        </h4>
                        <p>{directions}</p>
                    </div>
                )}
                {comment.length > 0 && (
                    <div>
                        <h4 style={{ fontWeight: 600, color: "#446892" }}>
                            Comments
                        </h4>
                        <p>{comment}</p>
                    </div>
                )}
            </Stack>
        </Scroll>
    )
}

SelectedContent.defaultProps = {
    placeName: "Town Hall",
    street: "123 N Main Street",
    distance: 1.222,
    changing_table: false,
    unisex: true,
    accessible: true,
    directions: "...",
    comment: "...",
}
