import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Fetch } from '../../types/Fetch'
import { TypeRootState } from '..'

interface DatabaseState {
	databaseConfig: {
		dbname: string
		address: string
		port: string
		username: string
		password: string
	}
	status: Fetch
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

export const sendDatabaseConfig = createAsyncThunk<
	any,
	any,
	{ state: TypeRootState }
>('database/sendDatabaseConfig', async (_, { getState }) => {
	const {
		database: { databaseConfig },
		user: { accessToken },
	} = getState()
	const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}`, {
		method: 'POST',
		body: JSON.stringify(databaseConfig),
		headers: {
			Authorization: `${accessToken}`,
		},
	})
	const data = await response.json()

	if (data.result === 'success') {
		return data.result
	}
})

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
		builder.addCase(sendDatabaseConfig.fulfilled, (state, action) => {
			state.databaseConfig = action.payload
			state.status = 'success'
		})
		builder.addCase(sendDatabaseConfig.rejected, state => {
			state.status = 'error'
		})
	},
})

export const databaseActions = databaseSlice.actions
export const databaseReducer = databaseSlice.reducer
