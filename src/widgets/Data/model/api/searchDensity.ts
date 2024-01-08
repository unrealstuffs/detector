import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { Density, DensitySearch } from '../types/Density'

export const searchDensity = createAsyncThunk<
	Density[],
	DensitySearch,
	ThunkConfig<Density[]>
>('data/searchDensity', async (searchData, thunkApi) => {
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

		if (!data) {
			return thunkApi.rejectWithValue([])
		}

		return JSON.parse(data) || []
	} catch {
		return thunkApi.rejectWithValue([])
	}
})
