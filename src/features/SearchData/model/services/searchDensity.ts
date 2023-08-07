import { createAsyncThunk } from '@reduxjs/toolkit'
import SearchData from '../types/SearchData'
import { ThunkConfig } from 'app/store'
import { Density } from 'widgets/DataList'

export const searchDensity = createAsyncThunk<
	Density[],
	SearchData,
	ThunkConfig<Density[]>
>('data/searchDensity', async (searchData: SearchData, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()

	const url = process.env.REACT_APP_SET_TRAFFIC_DENSITY as string

	const searchObject = {
		directions: searchData.directions,
		lines: searchData.lines,
		density: {
			value: searchData.density.value || '0',
			statement: searchData.density.value
				? searchData.density.statement
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
