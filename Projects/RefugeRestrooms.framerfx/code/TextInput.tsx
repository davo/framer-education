import * as React from "react"
import { Frame, Color, addPropertyControls, ControlType } from "framer"

type Props = {
    value: string
    placeholder: string
    disabled: boolean
    readOnly: boolean
    password: boolean
    tint: string
    accent: string
    validation: (value: string) => boolean
    onBlur: (value: string, valid: boolean) => any
    onFocus: (value: string, valid: boolean) => any
    onInputStart: () => any
    onValueChange: (value: string, valid: boolean) => any
}

/**
 * TextInput
 * @param props
 */
export function TextInput(props: Partial<Props>) {
    // Grab the properties we want to use from props (note that we're
    // renaming the value to avoid conflicting with the state's `value`
    // property
    const {
        value: initialValue,
        placeholder,
        disabled,
        readOnly,
        password,
        tint,
        accent,
        validation,
        onInputStart,
        onValueChange,
    } = props

    /* ---------------------------------- State --------------------------------- */

    // Store the input's last value in a ref
    const inputValue = React.useRef(initialValue)

    // Initialize state with props values
    const [state, setState] = React.useState({
        value: initialValue,
        valid: validation(initialValue),
        typing: false,
        focused: false,
        hovered: false,
        active: false,
    })

    // When the hook receives new props values, overwrite the state
    React.useEffect(() => {
        // Sync inputValue ref with initialValue
        inputValue.current = initialValue

        setState({
            ...state,
            value: initialValue,
            valid: validation(initialValue),
        })
    }, [initialValue])

    /* ----------------------------- Event Handlers ----------------------------- */

    // Set the focus state when the user clicks in or out of the input
    const setFocus = (focused: boolean) => {
        if (focused) {
            props.onFocus(state.value, state.valid)
        } else {
            props.onBlur(state.value, state.valid)
        }

        setState({ ...state, focused })
    }

    // Set the hovered state when the user mouses in or out
    const setHover = (hovered: boolean) =>
        setState({ ...state, hovered, active: hovered ? state.active : false })

    // Set the active state when the user mouses down or up
    const setActive = (active: boolean) => setState({ ...state, active })

    // When the content of the input changes, run onValueChange and update state
    const handleInput = event => {
        if (disabled) return

        const { value } = event.target

        // Store the value in the inputValue ref
        inputValue.current = value

        // If we're not already typing, run props.onInputStart()
        if (!state.typing) {
            onInputStart()
        }

        // Set value and typing states
        setState({ ...state, value, typing: true })

        // After .5 seconds, check whether inputValue is still the same
        setTimeout(() => {
            // And if it is, run onValueChange and update state
            if (value === inputValue.current) {
                const valid = validation(value)
                onValueChange(value, valid)
                setState({ ...state, typing: false, value, valid })
            }
        }, 500)
    }

    /* ------------------------------ Presentation ------------------------------ */

    // Grab the properties we want to use from state
    const { value, valid, focused, hovered, active } = state

    const tintColor = Color(tint)
    const accentColor = Color(accent)
    const tc = tintColor.toValue()
    const ac = accentColor.toValue()

    // Define some variants
    const variants = {
        initial: {
            border: `2px solid ${tc}`,
        },
        hovered: {
            border: `2px solid ${Color.brighten(tintColor, 10).toValue()}`,
        },
        active: {
            border: `2px solid ${Color.brighten(tintColor, 15).toValue()}`,
        },
        focused: {
            border: `2px solid ${Color.brighten(tintColor, 20).toValue()}`,
        },
    }

    // Decide which variant to use
    const currentVariant = disabled
        ? "initial"
        : active
        ? "active"
        : focused
        ? "focused"
        : hovered
        ? "hovered"
        : "initial"

    return (
        <Frame
            // {...props as any}
            size="100%"
            background="#FFFFFF"
            borderRadius={4}
            color={ac}
            opacity={disabled ? 0.3 : 1}
            shadow={valid ? "none" : "0 2px 0px 0px #8855ff"}
            // Variants
            variants={variants}
            initial={currentVariant}
            animate={currentVariant}
        >
            <input
                type={password ? "password" : "text"}
                value={value || ""}
                placeholder={placeholder || ""}
                disabled={disabled}
                readOnly={readOnly}
                style={{
                    padding: "0px 12px",
                    fontSize: 14,
                    fontWeight: 600,
                    width: "100%",
                    height: "100%",
                    background: "none",
                    borderRadius: 4,
                    outline: "none",
                    border: "none",
                    color: ac,
                }}
                // Events
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onMouseDown={() => setActive(true)}
                onMouseUp={() => setActive(false)}
                onChange={handleInput}
            />
        </Frame>
    )
}

// Set the component's default properties
TextInput.defaultProps = {
    value: undefined,
    placeholder: undefined,
    disabled: false,
    readOnly: false,
    onFocus: () => null,
    onBlur: () => null,
    validation: () => true,
    onInputStart: () => null,
    onValueChange: () => null,
    height: 50,
    width: 200,
}

// Set the component's property controls
addPropertyControls(TextInput, {
    value: {
        type: ControlType.String,
        defaultValue: "",
        title: "Value",
    },
    placeholder: {
        type: ControlType.String,
        defaultValue: "",
        title: "Placeholder",
    },
    readOnly: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Read Only",
    },
    password: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Password",
    },
    disabled: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Disabled",
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
