import { createAsyncThunk } from '@reduxjs/toolkit'
import { CameraFetch } from '../types/CameraSchema'
import { ThunkConfig } from 'app/store'

export const getCameraConfig = createAsyncThunk<CameraFetch, void, ThunkConfig<any>>(
	'detector/getCameraConfig',
	async (_, thunkApi) => {
		const {
			user: { accessToken },
		} = thunkApi.getState()

		const [filter, servoX, servoY] = await Promise.all([
			fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
				method: 'PUT',
				body: JSON.stringify({ read: 'IR_CUT' }),
				headers: {
					Authorization: `${accessToken}`,
				},
			}),
			fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
				method: 'PUT',
				body: JSON.stringify({ read: 'SERVO_X' }),
				headers: {
					Authorization: `${accessToken}`,
				},
			}),
			fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
				method: 'PUT',
				body: JSON.stringify({ read: 'SERVO_Y' }),
				headers: {
					Authorization: `${accessToken}`,
				},
			}),
		])
		const dataFilter = await filter.json()
		const dataServoX = await servoX.json()
		const dataServoY = await servoY.json()

		return {
			servoX: dataServoX.data.SERVO_X || 0,
			servoY: dataServoY.data.SERVO_Y || 0,
			filter: dataFilter.data.IR_CUT === 'on' ? true : false,
		}
	}
)
