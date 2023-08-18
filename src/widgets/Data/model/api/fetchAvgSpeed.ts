import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '../../../../app/store'
import { AvgSpeed } from '../types/AvgSpeed'

export const fetchAvgSpeed = createAsyncThunk<
	AvgSpeed[],
	void,
	ThunkConfig<AvgSpeed[]>
>('data/fetchSpeed', async (_, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()
	try {
		const response = await fetch(`${process.env.REACT_APP_AVERAGE_SPEED}`, {
			method: 'GET',
			headers: {
				Authorization: accessToken || '',
			},
		})

		const data = await response.json()

		return [...JSON.parse(data.data || [])]
	} catch {
		return []
	}
})
