import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { Intensity } from '../types/Intensity'

export const fetchIntensity = createAsyncThunk<
	Intensity[],
	void,
	ThunkConfig<Intensity[]>
>('data/fetchIntensity', async (_, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()
	try {
		const response = await fetch(
			`${process.env.REACT_APP_TRAFFIC_INTENSITY}`,
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
})
