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
		setDbName(state, action) {
			state.databaseConfig.dbname = action.payload
		},
		setAddress(state, action) {
			state.databaseConfig.address = action.payload
		},
		setPort(state, action) {
			state.databaseConfig.port = action.payload
		},
		setUsername(state, action) {
			state.databaseConfig.username = action.payload
		},
		setPassword(state, action) {
			state.databaseConfig.password = action.payload
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
		})
		builder.addCase(sendDatabaseConfig.rejected, state => {
			state.status = 'error'
		})
	},
})

export const databaseActions = databaseSlice.actions
export const databaseReducer = databaseSlice.reducer
