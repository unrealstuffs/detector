import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'

export const getDetectorName = createAsyncThunk<
	string,
	void,
	ThunkConfig<string>
>('detector/getDetectorName', async (_, thunkApi) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_DEVICE_HOSTNAME}`)
		const { data } = await response.json()
		if (data) {
			return data
		} else {
			return thunkApi.rejectWithValue('')
		}
	} catch {
		return thunkApi.rejectWithValue('')
	}
})
