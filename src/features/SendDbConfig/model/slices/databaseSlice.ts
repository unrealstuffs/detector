import { createSlice } from '@reduxjs/toolkit'
import { FetchStatus } from 'shared/types/FetchStatus'
import { sendDatabaseConfig } from '../services/sendDatabaseConfig'

interface DatabaseState {
	databaseConfig: {
		remote_db_name: string
		local_db_address: string
		local_db_port: string
		remote_db_address: string
		remote_db_port: string
		remote_db_username: string
		remote_db_password: string
	}
	status: FetchStatus
}

const emptyDatabaseObject = {
	remote_db_name: '',
		local_db_address: '',
		local_db_port: '5432',
		remote_db_address: '',
		remote_db_port: '',
		remote_db_username: '',
		remote_db_password: '',
}

const initialState: DatabaseState = {
	databaseConfig: JSON.parse(localStorage.getItem('db_connection') || 'null') || emptyDatabaseObject,
	status: 'init',
}

const databaseSlice = createSlice({
	name: 'database',
	initialState,
	reducers: {
		setDbName(state, action) {
			state.databaseConfig.remote_db_name = action.payload
		},
		setLocalAddress(state, action) {
			state.databaseConfig.local_db_address = action.payload
		},
		setRemoteAddress(state, action) {
			state.databaseConfig.remote_db_address = action.payload
		},
		setLocalPort(state, action) {
			state.databaseConfig.local_db_port = action.payload
		},
		setRemotePort(state, action) {
			state.databaseConfig.remote_db_port = action.payload
		},
		setUsername(state, action) {
			state.databaseConfig.remote_db_username = action.payload
		},
		setPassword(state, action) {
			state.databaseConfig.remote_db_password = action.payload
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
			localStorage.setItem('db_connection', JSON.stringify(state.databaseConfig))
		})
		builder.addCase(sendDatabaseConfig.rejected, state => {
			state.status = 'error'
			localStorage.setItem('db_connection', JSON.stringify(state.databaseConfig))
		})
	},
})

export const databaseActions = databaseSlice.actions
export const databaseReducer = databaseSlice.reducer
