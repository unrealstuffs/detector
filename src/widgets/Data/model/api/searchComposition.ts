import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { Composition, CompositionSearch } from '../types/Composition'

export const searchComposition = createAsyncThunk<
	Composition[],
	CompositionSearch,
	ThunkConfig<Composition[]>
>('data/searchComposition', async (searchData, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()

	const url = process.env.REACT_APP_SET_VEH_COMPOSITION as string

	const searchObject = {
		directions: searchData.directions,
		lines: searchData.lines,
		interval: searchData.interval,
		vehicleTypes: searchData.vehicleTypes,
		quantity: {
			value: searchData.quantity.value || '0',
			statement: searchData.quantity.value
				? searchData.quantity.statement
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
