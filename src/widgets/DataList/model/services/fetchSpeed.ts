import { createAsyncThunk } from '@reduxjs/toolkit'
import { Speed } from '../types/Data'
import { ThunkConfig } from '../../../../app/store'

export const fetchSpeed = createAsyncThunk<Speed[], void, ThunkConfig<Speed[]>>(
	'data/fetchSpeed',
	async (_, thunkApi) => {
		const {
			user: { accessToken },
		} = thunkApi.getState()
		try {
			const response = await fetch(
				`${process.env.REACT_APP_AVERAGE_SPEED}`,
				{
					method: 'GET',
					headers: {
						Authorization: accessToken || '',
					},
				}
			)

			const data = await response.json()

			return [...JSON.parse(data.data || [])]
		} catch {
			return []
		}
	}
)
