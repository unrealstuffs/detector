import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getAppConfig } from '../services/getAppConfig'

export interface AppConfigState {
	restartCamera: boolean
	videoQuality: boolean
	servoSettings: boolean
	focusAndZoomByStep: boolean
}

const initialState: AppConfigState = {
	restartCamera: false,
	videoQuality: false,
	servoSettings: false,
	focusAndZoomByStep: true,
}

const appConfigSlice = createSlice({
	name: 'appConfig',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getAppConfig.fulfilled, (state, action: PayloadAction<AppConfigState>) => {
			state.focusAndZoomByStep = action.payload.focusAndZoomByStep
			state.servoSettings = action.payload.servoSettings
			state.videoQuality = action.payload.videoQuality
			state.restartCamera = action.payload.restartCamera
		})
		builder.addCase(getAppConfig.rejected, state => {
			state.focusAndZoomByStep = initialState.focusAndZoomByStep
			state.servoSettings = initialState.servoSettings
			state.videoQuality = initialState.videoQuality
			state.restartCamera = initialState.restartCamera
		})
	},
})

export const appConfigActions = appConfigSlice.actions
export const appConfigReducer = appConfigSlice.reducer
