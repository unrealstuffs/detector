import { createSlice } from '@reduxjs/toolkit'

interface CameraState {
	cameraConfig: {
		dryCont: boolean
		filter: boolean
		zoom: number
		servoX: number
		servoY: number
		focus: number
	}
}

const initialState: CameraState = {
	cameraConfig: {
		dryCont: true,
		filter: false,
		zoom: 10000,
		servoX: 90,
		servoY: 90,
		focus: 10000,
	},
}

const cameraSlice = createSlice({
	name: 'camera',
	initialState,
	reducers: {
		setCameraConfig(state, action) {
			state.cameraConfig = action.payload
		},
		resetCameraConfig(state) {
			state.cameraConfig = initialState.cameraConfig
		},
	},
})

export const cameraActions = cameraSlice.actions
export const cameraReducer = cameraSlice.reducer
