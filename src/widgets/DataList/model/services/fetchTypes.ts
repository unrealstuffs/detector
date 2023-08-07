import { createAsyncThunk } from '@reduxjs/toolkit'
import { Type } from '../types/Data'
import { ThunkConfig } from '../../../../app/store'

export const fetchTypes = createAsyncThunk<Type[], void, ThunkConfig<Type[]>>(
	'data/fetchTypes',
	async (_, thunkApi) => {
		const {
			user: { accessToken },
		} = thunkApi.getState()

		try {
			const types = await fetch(
				`${process.env.REACT_APP_VEHICLE_TYPES_AND_PLATES}`,
				{
					method: 'GET',
					headers: {
						Authorization: accessToken || '',
					},
				}
			)

			const dataTypes = await types.json()

			return [...JSON.parse(dataTypes.data || [])]
		} catch {
			return []
		}
	}
)
