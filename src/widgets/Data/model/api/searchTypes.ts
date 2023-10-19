import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { Type, TypesSearch } from '../types/Types'

export const searchTypes = createAsyncThunk<
	Type[],
	TypesSearch,
	ThunkConfig<Type[]>
>('data/searchTypes', async (searchData, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()

	const url = process.env.REACT_APP_SET_VEHICLE_TYPES_AND_PLATES as string

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: { Authorization: accessToken || '' },
			body: JSON.stringify(searchData),
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
