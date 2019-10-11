import * as React from "react"
import { Frame, addPropertyControls, ControlType, FrameProps } from "framer"
import { TextInput } from "./TextInput"
import { Icons_SearchLocation as SearchLocation } from "./canvas"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

interface Props extends FrameProps {
    tint: string
    accent: string
    value: string
    onInputStart: () => any
    onValueChange: (value: string) => void
    onIconTap: (value: any) => void
    onFocus: (value: any) => void
    onBlur: (value: any) => void
}

export function SearchInput(props: Partial<Props>) {
    const {
        height,
        width,
        tint,
        accent,
        value,
        onInputStart,
        onValueChange,
        onIconTap,
        onFocus,
        onBlur,
    } = props

    const [focused, setFocused] = React.useState(false)
    const containerWidth = Math.min(width as number, 434)

    return (
        <Frame height={50} width={containerWidth} center="x" background="none">
            <TextInput
                tint={tint}
                accent={accent}
                value={value}
                onBlur={v => {
                    setFocused(false)
                    onBlur(v)
                }}
                onFocus={v => {
                    setFocused(true)
                    onFocus(v)
                }}
                onInputStart={onInputStart}
                onValueChange={onValueChange}
                placeholder="Search"
            />
            {value.length > 0 && (
                <Frame
                    right={2}
                    center="y"
                    height={44}
                    width={44}
                    background="#FFFFFF"
                >
                    <SearchLocation top={12} right={8} onTap={onIconTap} />
                </Frame>
            )}
        </Frame>
    )
}

SearchInput.defaultProps = {
    tint: "#0177ff",
    accent: "#333333",
    value: "Chicago",
    width: 311,
    height: 50,
    onInputStart: () => null,
    onValueChange: (value: string) => null,
    onIconTap: (value: any) => null,
    onFocus: (value: any) => null,
    onBlur: (value: any) => null,
}
