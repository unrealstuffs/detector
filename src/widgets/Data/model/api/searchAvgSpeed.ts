import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { AvgSpeed, AvgSpeedSearch } from '../types/AvgSpeed'

export const searchAvgSpeed = createAsyncThunk<
	AvgSpeed[],
	AvgSpeedSearch,
	ThunkConfig<AvgSpeed[]>
>('data/searchSpeed', async (searchData, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()

	const url = process.env.REACT_APP_SET_AVERAGE_SPEED as string

	const searchObject = {
		directions: searchData.directions,
		lines: searchData.lines,
		avgSpeed: {
			value: searchData.avgSpeed.value || '0',
			statement: searchData.avgSpeed.value
				? searchData.avgSpeed.statement
				: 'more',
		},
		timestampRange: {
			from: searchData.timestampRange.from,
			to: searchData.timestampRange.to,
		},
	}

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: { Authorization: accessToken || '' },
			body: JSON.stringify(searchObject),
		})

		const { data } = await response.json()

		if (!data) {
			return thunkApi.rejectWithValue([])
		}

		return JSON.parse(data) || []
	} catch {
		return thunkApi.rejectWithValue([])
	}
})
