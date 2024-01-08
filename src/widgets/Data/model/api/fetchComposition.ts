import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '../../../../app/store'
import { Composition } from '../types/Composition'

export const fetchComposition = createAsyncThunk<
	Composition[],
	void,
	ThunkConfig<Composition[]>
>('data/fetchComposition', async (_, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()
	try {
		const response = await fetch(
			`${process.env.REACT_APP_VEH_COMPOSITION}`,
			{
				method: 'GET',
				headers: {
					Authorization: accessToken || '',
				},
			}
		)

		const data = await response.json()

		return [...JSON.parse(data.data || [])]
	} catch {
		return []
	}
})
