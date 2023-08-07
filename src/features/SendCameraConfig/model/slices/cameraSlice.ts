import { createSlice } from '@reduxjs/toolkit'
import { CameraSchema } from '../types/CameraSchema'
import { getCameraConfig } from '../services/getCameraConfig'
import { sendCameraConfig } from '../services/sendCameraConfig'

const initialState: CameraSchema = {
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
		builder.addCase(sendCameraConfig.fulfilled, state => {
			state.status = 'success'
			setTimeout(() => {
				state.status = 'init'
			}, 1000)
		})
		builder.addCase(sendCameraConfig.rejected, state => {
			state.status = 'error'
			setTimeout(() => {
				state.status = 'init'
			}, 1000)
		})
	},
})

export const cameraActions = cameraSlice.actions
export const cameraReducer = cameraSlice.reducer
