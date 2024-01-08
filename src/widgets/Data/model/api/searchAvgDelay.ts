import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { AvgDelay, AvgDelaySearch } from '../types/AvgDelay'

export const searchAvgDelay = createAsyncThunk<
	AvgDelay[],
	AvgDelaySearch,
	ThunkConfig<AvgDelay[]>
>('data/searchDelay', async (searchData, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()

	const url = process.env.REACT_APP_SET_AVERAGE_DELAY as string

	const searchObject = {
		directions: searchData.directions,
		lines: searchData.lines,
		avgDelay: {
			value: searchData.avgDelay.value || '0',
			statement: searchData.avgDelay.value
				? searchData.avgDelay.statement
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
