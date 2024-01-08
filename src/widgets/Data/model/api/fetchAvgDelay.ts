import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { AvgDelay } from '../types/AvgDelay'

export const fetchAvgDelay = createAsyncThunk<
	AvgDelay[],
	void,
	ThunkConfig<AvgDelay[]>
>('data/fetchDelay', async (_, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()
	try {
		const response = await fetch(`${process.env.REACT_APP_AVERAGE_DELAY}`, {
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
