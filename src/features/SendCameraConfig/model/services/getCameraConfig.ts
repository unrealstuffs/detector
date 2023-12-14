import { createAsyncThunk } from '@reduxjs/toolkit'
import { CameraFetch } from '../types/CameraSchema'
import { ThunkConfig } from 'app/store'

export const getCameraConfig = createAsyncThunk<CameraFetch, void, ThunkConfig<any>>(
	'detector/getCameraConfig',
	async (_, { rejectWithValue, getState }) => {
		const {
			user: { accessToken },
		} = getState()

		try {
			const [zoom, focus, filter, servoX, servoY] = await Promise.all([
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

			const dataZoom = await zoom.json()
			const dataFocus = await focus.json()
			const dataFilter = await filter.json()
			const dataServoX = await servoX.json()
			const dataServoY = await servoY.json()

			return {
				zoom: dataZoom.data.ZOOM || 0,
				focus: dataFocus.data.FOCUS || 0,
				filter: dataFilter.data.IR_CUT === 'on' ? true : false,
				servoX: dataServoX.data.SERVO_X || 90,
				servoY: dataServoY.data.SERVO_Y || 90,
			}
		} catch {
			return rejectWithValue('Unknown Error')
		}
	}
)
