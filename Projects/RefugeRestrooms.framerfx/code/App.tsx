import { Override, Data } from "framer"

/*
 *******************************************************
 **                                                   **
 **                     READ ME                       **
 **                                                   **
 **              This project requires a              **
 **                Mapbox Access Token!               **
 **                                                   **
 *******************************************************
 */

const MAPBOX_ACCESS_TOKEN = ""

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const search = Data({
    query: "",
    predictions: [],
    loading: false,
})

const map = Data({
    jump: false,
    viewport: {
        center: [-73.8, 40.8],
        zoom: 8,
    },
})

const results = Data({
    all: [],
    filtered: [],
    selected: null,
    loading: false,
})

const filters = Data({
    open: false,
    unisex: false,
    accessible: false,
    changing_table: false,
})

/* -------------------------------------------------------------------------- */
/*                                  Overrides                                 */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Overrides: Search --------------------------- */

export const SearchInput: Override = () => {
    return {
        value: search.query,
        onFocus: setPredictions,
        onIconTap: searchByCurrentPosition,
        onValueChange: setPredictions,
        onInputStart: () => (search.loading = true),
    }
}

export const SearchPredictionList: Override = () => {
    return {
        predicting: search.loading,
        predictions: search.predictions,
        onSelect: searchByPrediction,
    }
}

export const SearchNearbyButton: Override = ({ text }) => {
    return {
        visible: results.all.length === 0 && !results.loading,
        disabled: results.loading,
        text: results.loading ? "Searching..." : "Find a Bathroom Near Me",
        onTap: searchByCurrentPosition,
    }
}

/* ----------------------------- Overrides: Map ----------------------------- */

// A map showing markers for our current filtered results
export const Map: Override = props => {
    let { all, filtered, selected } = results
    const { jump, viewport } = map

    let markers = selected
        ? // if selected, just show the selected marker
          [
              {
                  id: filtered.indexOf(selected),
                  center: [selected.longitude, selected.latitude],
                  options: {
                      color: "#0177ff",
                  },
              },
          ]
        : // otherwise, show all results as markers
          filtered.map((result, index) => ({
              // show the filtered results in blue, and filtered-out in white
              id: index,
              center: [result.longitude, result.latitude],
              options: {
                  color: "#0177ff",
              },
          }))

    return {
        accessToken: MAPBOX_ACCESS_TOKEN,
        markers,
        zoom: viewport.zoom,
        longitude: viewport.center[0],
        latitude: viewport.center[1],
        visible: all.length > 0, // Hide this if we don't have results at all
        fitBounds: markers.length > 0, // If we don't have filtered, don't update bounds
        prepareViewport: (prev, next) => {
            // If jump is true, move the camera before flying to viewport,
            // otherwise, just fly to the viewport
            if (jump) {
                return { ...next, zoom: next.zoom - 1 }
            } else {
                return prev
            }
        },
        onViewportChange: viewport => {
            if (markers.length > 0) {
                // If we are have markers, update the viewport to here
                // Combined with the fitBounds conditional, this means that
                // the map will stay where it was if we filter out all markers
                map.viewport = viewport
            }
        },
        onClick: () => {
            // We can close all overlays by tapping the map
            search.predictions = []
            filters.open = false
        },
        onMarkerClick: marker => {
            const result = results.all[marker.id]
            setSelected(result)
        },
    }
}

// An indicator to show that the map is loading
export const MapLoadingIndicator: Override = () => {
    return {
        visible: results.loading,
    }
}

/* --------------------------- Overrides: Results --------------------------- */

// Header with number of results and filtered results
export const ResultsHeader: Override = () => {
    const { all, filtered } = results
    return {
        // hide when no results
        visible: all.length > 0,
        // Show Results (10) or Results (6 of 10) if filtering
        $left:
            filtered.length < all.length
                ? `Results (${filtered.length} of ${all.length})`
                : `Results (${all.length})`,
    }
}

// List of all results
export const ResultsList: Override = () => {
    const { all, filtered, selected } = results
    return {
        places: filtered,
        selected: selected,
        visible: all.length > 0, // Hide if we don't have any places
        onSelect: setSelected,
    }
}

/* --------------------------- Overrides: Filters --------------------------- */

// Overlay with switches for filtering resulst
export const FiltersOverlay: Override = () => {
    const { open } = filters

    return {
        variants: {
            visible: {
                y: 0,
            },
            hidden: {
                y: 280,
            },
        },
        initial: "hidden",
        // animate filters in when filters are open
        animate: open ? "visible" : "hidden",
    }
}

// Button to show filters overlay
export const FiltersOpenButton: Override = () => ({
    onTap: () => (filters.open = true),
})

// Button to hide filters overlay
export const FiltersCloseButton: Override = () => ({
    onTap: () => (filters.open = false),
})

// Reset all filters
export const FiltersResetButton: Override = () => ({
    opacity: ["changing_table", "accessible", "unisex"].some(f => filters[f])
        ? 1
        : 0.3,
    onTap: () =>
        updateFilters({
            changing_table: false,
            accessible: false,
            unisex: false,
        }),
})

// Switches shown on Filters overlay

export const FiltersAccessibleSwitch: Override = () => ({
    // Update filters (and map) with new accessible value
    value: filters.accessible,
    onValueChange: (value: boolean) => updateFilters({ accessible: value }),
})

export const FiltersUnisexSwitch: Override = () => ({
    // Update filters (and map) with new unisex value
    value: filters.unisex,
    onValueChange: (value: boolean) => updateFilters({ unisex: value }),
})

export const FiltersChangingTableSwitch: Override = () => ({
    // Update filters (and map) with new changing table value
    value: filters.changing_table,
    onValueChange: (value: boolean) => updateFilters({ changing_table: value }),
})

/* --------------------------- Overrides: Selected -------------------------- */

// Overlay with more details on selected result
export const SelectedOverlay: Override = () => {
    const { selected } = results

    return {
        variants: {
            visible: {
                y: 0,
            },
            hidden: {
                y: 280,
            },
        },
        initial: "hidden",
        animate: selected ? "visible" : "hidden",
    }
}

// Closes the selectetd result overlay
export const SelectedCloseButton: Override = () => ({
    onTap: () => (results.selected = null),
})

// Content for Selected overlay
export const SelectedContent: Override = () => {
    const { selected } = results

    if (!selected) {
        return {}
    }

    return { ...selected, placeName: selected.name }
}

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

// Get Place Predictions from  Mapbox's Geocode Search
const getMapboxPredictions = async (query: string, accessToken: string) => {
    // Bail if query is too short
    const url =
        `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
        `${query}.json?access_token=${accessToken}`

    const response = await fetch(url)
    const json = await response.json()
    return json.features || []
}

// Set our predictions (from Mapbox API )
const setPredictions = async (query: string) => {
    // Don't search for "My location"
    if (query === "My location") {
        return
    }

    // Clear predictions and selected
    search.query = query
    search.predictions = []
    results.selected = null

    // When predictions arrive, turn off loading and set predictions
    const predictions = await getMapboxPredictions(query, MAPBOX_ACCESS_TOKEN)

    search.loading = false
    search.predictions = predictions
}

// Use a mapbox prediction to make a search
const searchByPrediction = (place: any) =>
    setResults(
        place.place_name,
        place.geometry.coordinates[0],
        place.geometry.coordinates[1]
    )

// Get the user's current location and make a search
const searchByCurrentPosition = () => {
    if (!navigator || navigator.userAgent.includes("FramerX")) {
        console.warn(
            "Can't do this in Framer X -- open this project in Chrome!"
        )
        return
    }

    // Bail if we're already loading
    if (results.loading) {
        return
    }

    // Set the loading state
    search.query = "My location"
    results.loading = true

    // Get user location and use this to set results
    navigator.geolocation.getCurrentPosition(position =>
        setResults(
            "My location",
            position.coords.longitude,
            position.coords.latitude
        )
    )
}

// Get Results from Refuge Restrooms API
const queryRefugeByLocation = async (longitude: number, latitude: number) => {
    const url =
        "https://cors-anywhere.herokuapp.com/" +
        "http://www.refugerestrooms.org/api/v1/restrooms/" +
        "by_location?page=1&per_page=10&offset=0" +
        `&lat=${latitude}&lng=${longitude}`

    const options = {
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
    }

    const response = await fetch(url, options)

    const results = await response.json()

    return results
}

// Set our results (from Refuge Restrooms API )
const setResults = async (
    query: string,
    longitude: number,
    latitude: number
) => {
    // Set loading state and clear predictions
    search.predictions = []
    search.query = query
    results.loading = true

    // Get all location results from Refuge Restrooms API
    const all = await queryRefugeByLocation(longitude, latitude)

    // Clear loading state, get filtered results, and set results
    results.all = all
    results.filtered = getFiltered(all, filters)
    results.loading = false
    map.jump = true

    setTimeout(() => (map.jump = false), 160)
}

// Get a filtered array from results, based on our current filters
const getFiltered = (results: any[], filters = {}) => {
    const filtered = results.filter(place =>
        ["unisex", "accessible", "changing_table"].reduce((keep, key) => {
            // For each result, start from keep = true and iterate through the
            // filters. For each filter, change keep to false false if that
            // filter is true but this result's value for that filter isn't also
            // true. At the end, return keep.
            if (filters[key] && !place[key]) {
                return false
            } else {
                return keep
            }
        }, true)
    )

    return filtered
}

// Update our filters (and filtered results)
const updateFilters = (fs = {}) => {
    Object.assign(filters, fs)
    const filtered = getFiltered(results.all, filters)
    results.filtered = getFiltered(results.all, filters)
}

// Set the selected result
const setSelected = (result: any) => {
    // When we select a place, clear predictions (if open) and select the place
    search.predictions = []
    results.selected = result
}
