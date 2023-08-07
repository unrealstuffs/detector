import { createAsyncThunk } from '@reduxjs/toolkit'
import { Delay } from '../types/Data'
import { ThunkConfig } from '../../../../app/store'

export const fetchDelay = createAsyncThunk<Delay[], void, ThunkConfig<Delay[]>>(
	'data/fetchDelay',
	async (_, thunkApi) => {
		const {
			user: { accessToken },
		} = thunkApi.getState()
		try {
			const response = await fetch(
				`${process.env.REACT_APP_AVERAGE_DELAY}`,
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
