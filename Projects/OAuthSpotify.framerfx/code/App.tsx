import * as React from "react"
import { Override, Data } from "framer"
import { navigate } from "./Navigation"
// @ts-ignore
import { RowItem } from "@framer/steveruizok.education/code"

const { search } = window.location

// state

const appState = Data({
    user: {} as any,
    accessToken: null as string,
    selected: null,
    results: {
        items: [],
    },
})

// Navigation

const showLogin = () => {
    navigate({
        currentPage: 0,
        pageTitle: "Log In",
        backAction: null,
    })
}

const showAll = () => {
    navigate({
        currentPage: 1,
        pageTitle: "All",
        backAction: null,
    })
}

const showDetail = () => {
    navigate({
        currentPage: 2,
        pageTitle: "Detail",
        backAction: showAll,
    })
}

// Data

const getUserDetails = async () => {
    const res = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: "Bearer " + appState.accessToken,
        },
    })
    const userDetails = await res.json()
    appState.user = userDetails
}

const getUserPlayLists = async () => {
    const res = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
            Authorization: "Bearer " + appState.accessToken,
        },
    })
    const playlists = await res.json()

    appState.results = playlists
}

const authenticate = async () => {
    window.location.assign("http://localhost:8888/login")
}

const skipAuth = async () => {
    showAll()
}

const loadAll = async () => {
    // set data to state

    getUserDetails()
    getUserPlayLists()
    showAll()
}

const loadDetail = async gist => {
    // fetch data

    showDetail()
}

// authenticate

export const AuthenticateButton: Override = () => {
    return {
        onTap: authenticate,
    }
}

export const SkipAuthButton: Override = () => {
    return {
        onTap: skipAuth,
    }
}

// Overrides

export const Username: Override = () => {
    return {
        value: appState.user.display_name,
    }
}

export const UserEmail: Override = () => {
    return {
        value: appState.user.email,
    }
}

export const UserCountry: Override = () => {
    return {
        value: appState.user.country,
    }
}

export const UserPlaylists: Override = () => {
    console.log(appState.results)
    return {
        content: appState.results.items.map(item => (
            <RowItem
                width="100%"
                text={item.name}
                component="icon"
                icon="chevron-right"
                onTap={() => window.open(item.external_urls.spotify)}
            />
        )),
    }
}

// Kickoff

if (search && search.includes("access_token")) {
    appState.accessToken = search.split("?access_token=")[1]
    loadAll()
}
