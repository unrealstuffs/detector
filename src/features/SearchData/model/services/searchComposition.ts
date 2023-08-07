import { createAsyncThunk } from '@reduxjs/toolkit'
import SearchData from '../types/SearchData'
import { ThunkConfig } from 'app/store'
import { Composition } from 'widgets/DataList'

export const searchComposition = createAsyncThunk<
	Composition[],
	SearchData,
	ThunkConfig<Composition[]>
>('data/searchComposition', async (searchData: SearchData, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()

	const url = process.env.REACT_APP_SET_VEH_COMPOSITION as string

	const searchObject = {
		vehicleTypes: searchData.vehicleTypes,
		directions: searchData.directions,
		lines: searchData.lines,
		interval: searchData.interval || 0,
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

		return JSON.parse(data) || []
	} catch {
		return []
	}
})
