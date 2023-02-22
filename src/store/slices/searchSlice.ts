import { createSlice } from '@reduxjs/toolkit'

interface State {
	searchFor: string
}

const initialState: State = {
	searchFor: '',
}

const searchSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setSearchFor(state, action) {
			state.searchFor = action.payload
		},
	},
})

export const searchActions = searchSlice.actions
export const searchReducer = searchSlice.reducer
