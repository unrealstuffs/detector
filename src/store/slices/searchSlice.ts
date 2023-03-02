import { createSlice } from '@reduxjs/toolkit'

interface State {
	searchFor: string[]
}

const initialState: State = {
	searchFor: [],
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchFor(state, action) {
			state.searchFor.push(action.payload)
		},
		resetSearchFor(state, action) {
			state.searchFor = state.searchFor.filter(
				item => item !== action.payload
			)
		},
	},
})

export const searchActions = searchSlice.actions
export const searchReducer = searchSlice.reducer
