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

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: { Authorization: accessToken || '' },
			body: JSON.stringify(searchData),
		})

		const { data } = await response.json()

		return JSON.parse(data) || []
	} catch {
		return thunkApi.rejectWithValue([])
	}
})
