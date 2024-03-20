import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../types/User'
import { FetchStatus } from 'shared/types/FetchStatus'
import { loginByUsername } from 'features/LoginByUsername/model/services/loginByUsername'
import { editLoginAndPassword } from 'features/EditLoginAndPassword/model/services/editLoginAndPassword'

export interface UserSchema extends User {
	status: FetchStatus
	newLogin: string
	newPassword: string
}

const initialState: UserSchema = {
	accessToken: JSON.parse(localStorage.getItem('accessToken') || 'null'),
	login: '',
	password: '',
	newLogin: '',
	newPassword: '',
	status: 'init',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout(state) {
			state.accessToken = null
			localStorage.removeItem('accessToken')
			state.login = ''
			state.password = ''
			state.newLogin = ''
			state.newPassword = ''
		},
		setLogin(state, action) {
			state.login = action.payload
		},
		setPassword(state, action) {
			state.password = action.payload
		},
		setNewLogin(state, action) {
			state.newLogin = action.payload
		},
		setNewPassword(state, action) {
			state.newPassword = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(loginByUsername.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(loginByUsername.fulfilled, (state, action: PayloadAction<User>) => {
			state.status = 'success'
			state.accessToken = action.payload.accessToken
			state.login = ''
			state.password = ''
			localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken))
		})
		builder.addCase(loginByUsername.rejected, state => {
			state.status = 'error'
		})
		builder.addCase(editLoginAndPassword.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(editLoginAndPassword.fulfilled, state => {
			state.status = 'success'
		})
		builder.addCase(editLoginAndPassword.rejected, state => {
			state.status = 'error'
		})
	},
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
