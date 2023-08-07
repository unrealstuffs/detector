import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'

export const sendDatabaseConfig = createAsyncThunk<any, void, ThunkConfig<any>>(
	'database/sendDatabaseConfig',
	async (_, { getState, rejectWithValue }) => {
		const {
			database: { databaseConfig },
			user: { accessToken },
		} = getState()

		try {
			const response = await fetch(
				`${process.env.REACT_APP_DATABASE_URL}`,
				{
					method: 'POST',
					body: JSON.stringify(databaseConfig),
					headers: {
						Authorization: `${accessToken}`,
					},
				}
			)
			const { result } = await response.json()

			if (result === 'success') {
				return ''
			} else {
				rejectWithValue('error')
			}
		} catch {
			throw new Error('Unable to connect to database')
		}
	}
)
