import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Fetch } from '../../types/Fetch'
import { TypeRootState } from '..'

interface CameraState {
	cameraConfig: {
		dryCont: boolean
		filter: boolean
		zoom: number
		servoX: number
		servoY: number
		focus: number
	}
	status: Fetch
}

const initialState: CameraState = {
	cameraConfig: {
		dryCont: true,
		filter: false,
		zoom: 0,
		servoX: 85,
		servoY: 85,
		focus: 0,
	},
	status: 'init',
}

export const sendCameraConfig = createAsyncThunk<
	any,
	any,
	{
		state: TypeRootState
	}
>('detector/sendCameraConfig', async (_, { getState }) => {
	const {
		camera: { cameraConfig },
		user: { accessToken },
	} = getState()
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
	const data = await zoom.json()
	if (data.result === 'success') {
		return data
	}
})

export const getCameraConfig = createAsyncThunk(
	'detector/getCameraConfig',
	async (accessToken: string) => {
		// const { accessToken } = args
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
			zoom: dataZoom.data.ZOOM,
			focus: dataFocus.data.FOCUS,
			servoX: dataServoX.data.SERVO_X,
			servoY: dataServoY.data.SERVO_Y,
			filter: dataFilter.data.IR_CUT === 'on' ? true : false,
		}
	}
)

const cameraSlice = createSlice({
	name: 'camera',
	initialState,
	reducers: {
		setCameraConfig(state, action) {
			state.cameraConfig = action.payload
		},
		setCameraConfigStatus(state, action) {
			state.status = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(getCameraConfig.fulfilled, (state, action) => {
			state.cameraConfig = action.payload
		})
		builder.addCase(sendCameraConfig.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(sendCameraConfig.fulfilled, (state, action) => {
			state.status = 'success'
			state.cameraConfig = action.payload
		})
		builder.addCase(sendCameraConfig.rejected, state => {
			state.status = 'error'
		})
	},
})

export const cameraActions = cameraSlice.actions
export const cameraReducer = cameraSlice.reducer
