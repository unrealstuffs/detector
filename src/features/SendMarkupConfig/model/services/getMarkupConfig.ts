import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { MarkupConfig } from '../types/markupConfig'

export const getMarkupConfig = createAsyncThunk<MarkupConfig, void, ThunkConfig<any>>(
	'markup/getMarkupConfig',
	async (_, { getState, rejectWithValue }) => {
		const {
			user: { accessToken },
		} = getState()

		try {
			const response = await fetch(`${process.env.REACT_APP_EDIT_ZONE_URL}`, {
				method: 'GET',
				headers: {
					Authorization: accessToken || '',
				},
			})
			const data = await response.json()

			const tempArr = JSON.parse(data.data)
			return tempArr.zone.directs
		} catch {
			return rejectWithValue('error')
		}
	}
)
