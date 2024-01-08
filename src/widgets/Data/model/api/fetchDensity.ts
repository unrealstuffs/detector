import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '../../../../app/store'
import { Density } from '../types/Density'

export const fetchDensity = createAsyncThunk<
	Density[],
	void,
	ThunkConfig<Density[]>
>('data/fetchDensity', async (_, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()
	try {
		const response = await fetch(
			`${process.env.REACT_APP_TRAFFIC_DENSITY}`,
			{
				method: 'GET',
				headers: {
					Authorization: accessToken || '',
				},
			}
		)

		const dataDansity = await response.json()

		return [...JSON.parse(dataDansity.data || [])]
	} catch {
		return []
	}
})
