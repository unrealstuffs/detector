import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'

export const sendMarkupConfig = createAsyncThunk<any, void, ThunkConfig<any>>(
	'markup/sendMarkupConfig',
	async (_, { getState, rejectWithValue }) => {
		const {
			markup: { markupConfig },
			user: { accessToken },
		} = getState()

		try {
			const response = await fetch(`${process.env.REACT_APP_EDIT_ZONE_URL}`, {
				method: 'PUT',
				body: JSON.stringify(markupConfig),
				headers: {
					Authorization: accessToken || '',
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
