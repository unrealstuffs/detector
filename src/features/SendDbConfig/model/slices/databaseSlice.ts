import { createSlice } from '@reduxjs/toolkit'
import { FetchStatus } from 'shared/types/FetchStatus'
import { sendDatabaseConfig } from '../services/sendDatabaseConfig'

interface DatabaseState {
	databaseConfig: {
		dbname: string
		address: string
		port: string
		username: string
		password: string
	}
	status: FetchStatus
}

const initialState: DatabaseState = {
	databaseConfig: {
		dbname: '',
		address: '',
		port: '',
		username: '',
		password: '',
	},
	status: 'init',
}

const databaseSlice = createSlice({
	name: 'database',
	initialState,
	reducers: {
		setDatabaseConfig(state, action) {
			state.databaseConfig = action.payload
		},
		setDatabaseConfigStatus(state, action) {
			state.status = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(sendDatabaseConfig.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(sendDatabaseConfig.fulfilled, state => {
			state.status = 'success'
			setTimeout(() => {
				state.status = 'init'
			}, 1000)
		})
		builder.addCase(sendDatabaseConfig.rejected, state => {
			state.status = 'error'
			setTimeout(() => {
				state.status = 'init'
			}, 1000)
		})
	},
})

export const databaseActions = databaseSlice.actions
export const databaseReducer = databaseSlice.reducer
