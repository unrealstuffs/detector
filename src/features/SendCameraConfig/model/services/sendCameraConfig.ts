import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '../../../../app/store'

export const sendCameraConfig = createAsyncThunk<any, void, ThunkConfig<any>>(
	'detector/sendCameraConfig',
	async (_, thunkApi) => {
		const {
			camera: { cameraConfig },
			user: { accessToken },
		} = thunkApi.getState()

		try {
			const [zoom, focus, servoX, servoY, filter] = await Promise.all([
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({ ZOOM: cameraConfig.zoom }),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({ FOCUS: cameraConfig.focus }),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({ SERVO_X: cameraConfig.servoX }),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({ SERVO_Y: cameraConfig.servoY }),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({
						IR_CUT: cameraConfig.filter === true ? 'on' : 'off',
					}),
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

			if (
				dataFilter &&
				dataZoom &&
				dataServoX &&
				dataFocus &&
				dataServoY
			) {
				return {
					dataFilter,
					dataZoom,
					dataServoX,
					dataFocus,
					dataServoY,
				}
			}
		} catch {
			throw new Error('Unable to set camera settings')
		}
	}
)
