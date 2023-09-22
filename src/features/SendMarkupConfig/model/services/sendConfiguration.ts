import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'

export const sendConfiguration = createAsyncThunk<any, void, ThunkConfig<any>>(
	'configuration/sendConfiguration',
	async (_, { getState, rejectWithValue }) => {
		const {
			markup: { configuration },
			video: { videoSize },
			user: { accessToken },
		} = getState()

		const finalConfig = {
			base_size: [videoSize.width, videoSize.height],
			zone: {
				r_00: {
					pl: [
						[0, 0],
						[videoSize.width, 0],
						[videoSize.width, videoSize.height],
						[0, videoSize.height],
					],
					s: {
						...configuration,
					},
				},
			},
		}

		try {
			const response = await fetch(
				`${process.env.REACT_APP_EDIT_ZONE_URL}`,
				{
					method: 'PUT',
					body: JSON.stringify(finalConfig),
					headers: {
						Authorization: accessToken || '',
					},
				}
			)
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
