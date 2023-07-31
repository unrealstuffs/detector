import { createSlice } from '@reduxjs/toolkit'

interface UserState {
	user: string | null
	accessToken: string | null
}

const initialState: UserState = {
	user: null,
	accessToken: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload.user
			state.accessToken = action.payload.accessToken
		},
		removeUser(state) {
			state.user = null
			state.accessToken = null
		},
	},
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
