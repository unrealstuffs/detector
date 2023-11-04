import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/store'
import { ServerResponse } from 'shared/types/ServerResponse'

async function fetchData(
	body: { [key: string]: number | string | null },
	accessToken: string
): Promise<ServerResponse<any>> {
	const response = await fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			Authorization: accessToken,
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
		} = getState()

		try {
			const dynamicRequests = []

			if (cameraConfig.zoom) {
				dynamicRequests.push(fetchData({ ZOOM: cameraConfig.zoom }, `${accessToken}`))
			}

			if (cameraConfig.focus) {
				dynamicRequests.push(fetchData({ FOCUS: cameraConfig.focus }, `${accessToken}`))
			}

			const responses: ServerResponse<any>[] = await Promise.all([
				...dynamicRequests,
				fetchData({ SERVO_X: cameraConfig.servoX }, `${accessToken}`),
				fetchData({ SERVO_Y: cameraConfig.servoY }, `${accessToken}`),
				fetchData({ IR_CUT: cameraConfig.filter === true ? 'on' : 'off' }, `${accessToken}`),
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
