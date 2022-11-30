import { createSlice } from '@reduxjs/toolkit'

interface CameraState {
	databaseConfig: {
		dbname: string
		address: string
		port: string
		username: string
		password: string
	}
}

const initialState: CameraState = {
	databaseConfig: {
		dbname: '',
		address: '',
		port: '',
		username: '',
		password: '',
	},
}

const databaseSlice = createSlice({
	name: 'database',
	initialState,
	reducers: {
		setDatabaseConfig(state, action) {
			state.databaseConfig = action.payload
		},
		resetDatabaseConfig(state) {
			state.databaseConfig = initialState.databaseConfig
		},
	},
})

export const databaseActions = databaseSlice.actions
export const databaseReducer = databaseSlice.reducer
