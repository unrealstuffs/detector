import { createAsyncThunk } from '@reduxjs/toolkit'
import SearchData from '../types/SearchData'
import { ThunkConfig } from 'app/store'
import { Speed } from 'widgets/DataList'

export const searchSpeed = createAsyncThunk<
	Speed[],
	SearchData,
	ThunkConfig<Speed[]>
>('data/searchSpeed', async (searchData: SearchData, thunkApi) => {
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

		return JSON.parse(data) || []
	} catch {
		return []
	}
})
