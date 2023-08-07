import { createAsyncThunk } from '@reduxjs/toolkit'
import SearchData from '../types/SearchData'
import { ThunkConfig } from 'app/store'
import { Type } from 'widgets/DataList/model/types/Data'

export const searchTypes = createAsyncThunk<
	Type[],
	SearchData,
	ThunkConfig<Type[]>
>('data/searchTypes', async (searchData: SearchData, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()

	const url = process.env.REACT_APP_SET_VEHICLE_TYPES_AND_PLATES as string

	const searchObject = {
		licensePlates: searchData.licensePlates,
		vehicleTypes: searchData.vehicleTypes,
		directions: searchData.directions,
		lines: searchData.lines,
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
