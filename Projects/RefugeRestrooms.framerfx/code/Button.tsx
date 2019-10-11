import * as React from "react"
import { Frame, Color, addPropertyControls, ControlType } from "framer"

// Define a type for our props
type Props = {
    height: number
    text: string
    disabled: boolean
    toggle: boolean
    toggled: boolean
    tint: string
    accent: string
    onTap: (toggled: boolean | null) => void
}

/**
 * Button
 * @param props
 */
export function Button(props: Partial<Props>) {
    // Grab the properties we want to use from props (note that we're
    // renaming toggled to avoid conflicting with the state's toggled
    // property
    const {
        height,
        disabled,
        toggle,
        toggled: initialToggled,
        onTap,
        text,
        tint,
        accent,
    } = props

    /* ---------------------------------- State --------------------------------- */

    // Initialize state with props values
    const [state, setState] = React.useState({
        toggled: toggle ? initialToggled : null,
        hovered: false,
        active: false,
    })

    // When the hook receives new props, overwrite the state
    React.useEffect(() => {
        setState({
            ...state,
            toggled: toggle ? initialToggled : null,
        })
    }, [initialToggled])

    /* ----------------------------- Event Handlers ----------------------------- */

    // When the user taps on the button, run onTap and update toggled
    const handleTap = () => {
        if (disabled) return

        const next = !state.toggled

        // Call onTap with the toggled state
        onTap(next)

        // If this button should toggle, flip the toggle state
        if (toggle) {
            setState({
                ...state,
                toggled: next,
                hovered: false,
                active: false,
            })
        }
    }

    // Set the hovered state when the user mouses in or out
    const setHover = (hovered: boolean) =>
        setState({ ...state, hovered, active: hovered ? state.active : false })

    // Set the active state when the user mouses down or up
    const setActive = (active: boolean) => setState({ ...state, active })

    /* ------------------------------ Presentation ------------------------------ */

    // Grab the properties we want to use from state
    const { toggled, hovered, active } = state

    let secondary = false
    const tintColor = Color(tint)
    const accentColor = Color(accent)

    const variants = {
        initial: {
            background: tint,
            boxShadow: `0px 4px 12px 0px rgba(0,0,0,.16)`,
        },
        hovered: {
            background: Color.brighten(tintColor, 10),
            boxShadow: `0px 4px 12px 0px rgba(0,0,0,.16)`,
        },
        active: {
            background: Color.brighten(tintColor, 15),
            boxShadow: `0px 1px 12px 0px rgba(0,0,0,.16)`,
        },
        toggled: {
            background: Color.brighten(tintColor, 20),
            boxShadow: `0px 1px 12px 0px rgba(0,0,0,.16)`,
        },
    }

    // Determine which variant to show
    const current = disabled
        ? toggled
            ? "toggled"
            : "initial"
        : toggled
        ? "toggled"
        : active
        ? "active"
        : hovered
        ? "hovered"
        : "initial"

    return (
        <Frame
            // Constant props
            size="100%"
            borderRadius={height / 2}
            opacity={disabled ? 0.3 : 1}
            color={accent}
            style={{
                fontSize: 14,
                fontWeight: 600,
            }}
            // Variant props
            variants={variants}
            initial={current}
            animate={current}
            // Events
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            onClick={handleTap}
        >
            {text}
        </Frame>
    )
}

// Set the component's default properties
Button.defaultProps = {
    height: 50,
    width: 128,
    disabled: false,
    text: "Get Started!",
    tint: "#027aff",
    accent: "#FFFFFF",
    primary: true,
    onTap: () => null,
}

// Set the component's property controls
addPropertyControls(Button, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "Get Started!",
    },
    toggle: {
        type: ControlType.Boolean,
        title: "Toggle",
        defaultValue: false,
    },
    toggled: {
        type: ControlType.Boolean,
        title: "Toggled",
        defaultValue: false,
        hidden: ({ toggle }) => !toggle,
    },
    disabled: {
        type: ControlType.Boolean,
        title: "Disabled",
        defaultValue: false,
    },
    tint: {
        type: ControlType.Color,
        defaultValue: "#027aff",
        title: "Tint",
    },
    accent: {
        type: ControlType.Color,
        defaultValue: "#FFFFFF",
        title: "Accent",
    },
})
