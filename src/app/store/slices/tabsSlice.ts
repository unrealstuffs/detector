import { createSlice } from '@reduxjs/toolkit'

interface TabsState {
	tab: 'data' | 'settings' | 'shot'
}

const initialState: TabsState = {
	tab: 'data',
}

const tabsSlice = createSlice({
	name: 'tabs',
	initialState,
	reducers: {
		setTab(state, action) {
			state.tab = action.payload
		},
	},
})

export const tabsActions = tabsSlice.actions
export const tabsReducer = tabsSlice.reducer
