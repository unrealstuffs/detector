import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { MarkupConfig } from 'shared/types/MarkupConfig'

export const getConfiguration = createAsyncThunk<
	MarkupConfig,
	void,
	ThunkConfig<MarkupConfig>
>('configuration/getConfiguration', async (_, { getState }) => {
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
		return tempArr.zone.r_00.s
	} catch {
		return {}
	}
})
