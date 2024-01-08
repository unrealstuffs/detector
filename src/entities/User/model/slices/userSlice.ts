import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../types/User'
import { FetchStatus } from 'shared/types/FetchStatus'
import { loginByUsername } from 'features/LoginByUsername/model/services/loginByUsername'

export interface UserSchema extends User {
	status: FetchStatus
}

const initialState: UserSchema = {
	user: null,
	accessToken: JSON.parse(localStorage.getItem('accessToken') || 'null'),
	status: 'init',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload.user
			state.accessToken = action.payload.accessToken
		},
		logout(state) {
			state.user = null
			state.accessToken = null
			localStorage.removeItem('accessToken')
		},
		setStatus(state, action: PayloadAction<FetchStatus>) {
			state.status = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(loginByUsername.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(
			loginByUsername.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.status = 'success'
				state.accessToken = action.payload.accessToken
				state.user = action.payload.user
				localStorage.setItem(
					'accessToken',
					JSON.stringify(action.payload.accessToken)
				)
			}
		)
		builder.addCase(loginByUsername.rejected, state => {
			state.status = 'error'
		})
	},
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
