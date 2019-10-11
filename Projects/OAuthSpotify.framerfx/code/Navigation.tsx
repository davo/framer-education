import * as React from "react"
import { Data, Override } from "framer"

const navState = Data({
    pageTitle: "Log In",
    backAction: () => null,
    currentPage: 0,
})

// Navigation

// Top navigation for current tab / back
export function Header(): Override {
    return {
        title: navState.pageTitle,
        leftLink: navState.backAction ? "Back" : "",
        leftIcon: navState.backAction ? "chevron-left" : "none",
        onLeftTap: () => navState.backAction && navState.backAction(),
    }
}

export function NavigationPage(): Override {
    return {
        currentPage: navState.currentPage,
    }
}

type NavigateOptions = {
    currentPage: number
    pageTitle: string
    backAction: any
}

export const navigate = (options: NavigateOptions = {} as NavigateOptions) => {
    Object.assign(navState, options)
}
