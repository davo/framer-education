import * as React from "react"

export type ScreenPosition = {
    x: number
    y: number
    width: number
    height: number
    left: number
    right: number
    top: number
    bottom: number
}

export function useScreenFrame() {
    const ref = React.useRef<HTMLDivElement>()
    const [rect, setRect] = React.useState<ScreenPosition>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    })

    React.useLayoutEffect(() => {
        if (!ref.current) return

        setRect(
            pick(
                ref.current.getBoundingClientRect() as DOMRect,
                "x",
                "y",
                "width",
                "height",
                "left",
                "right",
                "top",
                "bottom"
            )
        )
    }, [])

    return tuple(ref, rect)
}

const test = { x: 0, y: 100 }

function pick(o, ...props) {
    return Object.assign({}, ...props.map(prop => ({ [prop]: o[prop] })))
}

const tuple = <T extends unknown[]>(...args: T) => args
