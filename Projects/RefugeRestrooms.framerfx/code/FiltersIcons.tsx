import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

import {
    Icons_GenderNeutral as GNIcon,
    Icons_WheelchairAccessible as WCIcon,
    Icons_BabyChangingTable as BCIcon,
} from "./canvas"

type Props = {
    unisex: boolean
    changing_table: boolean
    accessible: boolean
}

export function FiltersIcons(props) {
    const { unisex, accessible, changing_table, inFlow } = props
    return (
        <Frame height={18} width={70} background="none" {...props}>
            <GNIcon size={18} right={52} opacity={unisex ? 1 : 0.3} />
            <WCIcon size={18} right={26} opacity={accessible ? 1 : 0.3} />
            <BCIcon size={18} right={0} opacity={changing_table ? 1 : 0.3} />
        </Frame>
    )
}

FiltersIcons.defaultProps = {
    unisex: true,
    changing_table: true,
    accessible: true,
}
