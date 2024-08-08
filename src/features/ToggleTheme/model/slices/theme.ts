import { createSlice } from "@reduxjs/toolkit"

export type ThemeValues = "dark" | "light"

interface ThemeState {
    theme: ThemeValues
}

const initialState: ThemeState = {
    theme: (localStorage.getItem("theme") as ThemeValues) || "dark",
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            state.theme = action.payload
        },
    },
})

export const themeReducer = themeSlice.reducer
export const themeActions = themeSlice.actions
