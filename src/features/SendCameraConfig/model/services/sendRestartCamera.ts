import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'

export const sendRestartCamera = createAsyncThunk<any, void, ThunkConfig<any>>(
	'detector/sendRestartCamera',
	async (_, { getState, rejectWithValue }) => {
		const {
			user: { accessToken },
		} = getState()

		try {
			const response = await fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
				method: 'PUT',
				body: JSON.stringify({ CAMERA: 'RESTART' }),
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
