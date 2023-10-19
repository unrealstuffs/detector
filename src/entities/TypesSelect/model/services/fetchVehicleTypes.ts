import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'

export const fetchVehicleTypes = createAsyncThunk<
	string[],
	void,
	ThunkConfig<string[]>
>('vehicleType/fetchVehicleTypes', async (_, thunkApi) => {
	const {
		user: { accessToken },
	} = thunkApi.getState()

	try {
		const response = await fetch(`${process.env.REACT_APP_VEHICLE_EUR13}`, {
			method: 'GET',
			headers: { Authorization: accessToken || '' },
		})
		const { data } = await response.json()
		if (data) {
			return JSON.parse(data)
		} else {
			return thunkApi.rejectWithValue([])
		}
	} catch {
		return thunkApi.rejectWithValue([])
	}
})
