import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { ServerResponse } from 'shared/types/ServerResponse'

async function fetchData(
	url: string,
	body: { [key: string]: number | string },
	accessToken: string
): Promise<ServerResponse<any>> {
	const response = await fetch(url, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			Authorization: accessToken,
			'Content-Type': 'application/json',
		},
	})
	const responseData: ServerResponse<any> = await response.json()
	return responseData
}

export const sendCameraConfig = createAsyncThunk<any, void, ThunkConfig<any>>(
	'detector/sendCameraConfig',
	async (_, { getState, rejectWithValue }) => {
		const {
			camera: { cameraConfig },
			user: { accessToken },
			appConfig: { servoSettings },
		} = getState()

		try {
			const dynamicRequests = []

			if (cameraConfig.zoom === 'NEXT') {
				dynamicRequests.push(fetchData(`${process.env.REACT_APP_SET_NEXT_ZOOM_PRESET}`, {}, `${accessToken}`))
			}

			if (cameraConfig.zoom === 'PREV') {
				dynamicRequests.push(fetchData(`${process.env.REACT_APP_SET_PREV_ZOOM_PRESET}`, {}, `${accessToken}`))
			}

			if (cameraConfig.focus) {
				dynamicRequests.push(
					fetchData(
						`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`,
						{ FOCUS: cameraConfig.focus },
						`${accessToken}`
					)
				)
			}

			if (servoSettings) {
				dynamicRequests.push(
					fetchData(
						`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`,
						{ SERVO_X: cameraConfig.servoX },
						`${accessToken}`
					)
				)
				dynamicRequests.push(
					fetchData(
						`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`,
						{ SERVO_Y: cameraConfig.servoY },
						`${accessToken}`
					)
				)
			}

			const responses: ServerResponse<any>[] = await Promise.all([
				...dynamicRequests,
				fetchData(
					`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`,
					{ IR_CUT: cameraConfig.filter === true ? 'on' : 'off' },
					`${accessToken}`
				),
			])

			const errorResponse = responses.find(response => response.result === 'error')
			if (errorResponse) {
				return rejectWithValue(errorResponse.meta.message)
			}

			return 'success'
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			} else {
				return rejectWithValue('Unknown Error')
			}
		}
	}
)
