import { createAsyncThunk } from '@reduxjs/toolkit'
import SearchData from '../types/SearchData'
import { ThunkConfig } from 'app/store'
import { Delay } from 'widgets/DataList'

export const searchDelay = createAsyncThunk<
	Delay[],
	SearchData,
	ThunkConfig<Delay[]>
>('data/searchDelay', async (searchData: SearchData, thunkApi) => {
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

		return JSON.parse(data) || []
	} catch {
		return []
	}
})
