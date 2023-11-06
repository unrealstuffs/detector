import { createAsyncThunk } from '@reduxjs/toolkit'
import { CameraFetch } from '../types/CameraSchema'
import { ThunkConfig } from 'app/store'

export const getCameraConfig = createAsyncThunk<CameraFetch, void, ThunkConfig<any>>(
	'detector/getCameraConfig',
	async (_, thunkApi) => {
		const {
			user: { accessToken },
		} = thunkApi.getState()

		const [filter] = await Promise.all([
			fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
				method: 'PUT',
				body: JSON.stringify({ read: 'IR_CUT' }),
				headers: {
					Authorization: `${accessToken}`,
				},
			}),
		])
		const dataFilter = await filter.json()

		return {
			filter: dataFilter.data.IR_CUT === 'on' ? true : false,
		}
	}
)
