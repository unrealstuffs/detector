import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { Intensity, IntensitySearch } from '../types/Intensity'

export const searchIntensity = createAsyncThunk<
	Intensity[],
	IntensitySearch,
	ThunkConfig<Intensity[]>
>('data/searchIntensity', async (searchData, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()

	const url = process.env.REACT_APP_SET_TRAFFIC_INTENSITY as string

	const searchObject = {
		directions: searchData.directions,
		lines: searchData.lines,
		intensity: {
			value: searchData.intensity.value || '0',
			statement: searchData.intensity.value
				? searchData.intensity.statement
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
