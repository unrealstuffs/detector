import { createAsyncThunk } from '@reduxjs/toolkit'
import { CameraSettings } from '../types/CameraSchema'
import { ThunkConfig } from 'app/store'

export const getCameraConfig = createAsyncThunk<CameraSettings, void, ThunkConfig<any>>(
	'detector/getCameraConfig',
	async (_, thunkApi) => {
		const {
			user: { accessToken },
		} = thunkApi.getState()

		const [zoom, focus, servoX, servoY, filter] = await Promise.all([
			fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
				method: 'PUT',
				body: JSON.stringify({ read: 'ZOOM' }),
				headers: {
					Authorization: `${accessToken}`,
				},
			}),
			fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
				method: 'PUT',
				body: JSON.stringify({ read: 'FOCUS' }),
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
			fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
				method: 'PUT',
				body: JSON.stringify({ read: 'IR_CUT' }),
				headers: {
					Authorization: `${accessToken}`,
				},
			}),
		])
		const dataZoom = await zoom.json()
		const dataFocus = await focus.json()
		const dataServoX = await servoX.json()
		const dataServoY = await servoY.json()
		const dataFilter = await filter.json()

		return {
			dryCont: true,
			zoom: dataZoom.data.ZOOM || 0,
			focus: dataFocus.data.FOCUS || 0,
			servoX: dataServoX.data.SERVO_X || 0,
			servoY: dataServoY.data.SERVO_Y || 0,
			filter: dataFilter.data.IR_CUT === 'on' ? true : false,
		}
	}
)
