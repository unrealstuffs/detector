import { createSlice } from '@reduxjs/toolkit'

export type Tabs = 'data' | 'settings' | 'shot'

interface TabsSchema {
	tab: Tabs
}

const initialState: TabsSchema = {
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
