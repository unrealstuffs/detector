import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CameraSchema } from '../types/CameraSchema'
import { getCameraConfig } from '../services/getCameraConfig'
import { sendCameraConfig } from '../services/sendCameraConfig'
import { sendRestartCamera } from '../services/sendRestartCamera'

const initialState: CameraSchema = {
	cameraConfig: {
		filter: false,
		zoom: null,
		focus: null,
		servoX: 85,
		servoY: 85,
	},
	status: 'init',
}

const cameraSlice = createSlice({
	name: 'camera',
	initialState,
	reducers: {
		setFilter: (state, action: PayloadAction<boolean>) => {
			state.cameraConfig.filter = action.payload
		},
		setZoom: (state, action) => {
			state.cameraConfig.zoom = action.payload
		},
		setFocus: (state, action) => {
			state.cameraConfig.focus = action.payload
		},
		setServoX: (state, action) => {
			state.cameraConfig.servoX = action.payload
		},
		setServoY: (state, action) => {
			state.cameraConfig.servoY = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(getCameraConfig.fulfilled, (state, action) => {
			state.cameraConfig.filter = action.payload.filter
		})
		builder.addCase(sendCameraConfig.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(sendCameraConfig.fulfilled, state => {
			state.status = 'success'
		})
		builder.addCase(sendCameraConfig.rejected, state => {
			state.status = 'error'
		})
		builder.addCase(sendRestartCamera.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(sendRestartCamera.fulfilled, state => {
			state.status = 'success'
		})
		builder.addCase(sendRestartCamera.rejected, state => {
			state.status = 'error'
		})
	},
})

export const cameraActions = cameraSlice.actions
export const cameraReducer = cameraSlice.reducer
