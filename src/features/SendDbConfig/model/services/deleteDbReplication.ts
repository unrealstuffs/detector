import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'

export const deleteDbReplication = createAsyncThunk<any, void, ThunkConfig<any>>(
	'database/deleteDbReplication',
	async (_, { getState, rejectWithValue }) => {
		const {
			database: { databaseConfig },
			user: { accessToken },
		} = getState()

		try {
			const response = await fetch(`${process.env.REACT_APP_DATABASE_DROP}`, {
				method: 'POST',
				body: JSON.stringify(databaseConfig),
				headers: {
					Authorization: `${accessToken}`,
				},
			})
			const {
				result,
				meta: { message },
				data,
			} = await response.json()

			if (result === 'error') {
				return rejectWithValue(message)
			}

			return data
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			} else {
				return rejectWithValue('Unknown Error')
			}
		}
	}
)
