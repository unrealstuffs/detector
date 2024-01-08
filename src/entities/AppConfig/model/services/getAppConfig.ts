import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { AppConfigState } from '../slices/appConfigSlice'

export const getAppConfig = createAsyncThunk<AppConfigState, void, ThunkConfig<any>>(
	'appConfig/getAppConfig',
	async (_, thunkApi) => {
		try {
			const response = await fetch('app-config.json')
			const appConfig = await response.json()
			if (appConfig) {
				return appConfig
			} else {
				return thunkApi.rejectWithValue('No Config found')
			}
		} catch {
			return thunkApi.rejectWithValue('No Config found')
		}
	}
)
