import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getAppConfig } from '../services/getAppConfig'

export interface AppConfigState {
	restartCamera: boolean
	videoQuality: boolean
	servoSettings: boolean
	focusAndZoomType: 'STEP' | 'NUM'
	showMarkAndColor: boolean
}

const initialState: AppConfigState = {
	restartCamera: false,
	videoQuality: false,
	servoSettings: false,
	focusAndZoomType: 'NUM',
	showMarkAndColor: true,
}

const appConfigSlice = createSlice({
	name: 'appConfig',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getAppConfig.fulfilled, (state, action: PayloadAction<AppConfigState>) => {
			state.focusAndZoomType = action.payload.focusAndZoomType
			state.servoSettings = action.payload.servoSettings
			state.videoQuality = action.payload.videoQuality
			state.restartCamera = action.payload.restartCamera
			state.showMarkAndColor = action.payload.showMarkAndColor
		})
		builder.addCase(getAppConfig.rejected, state => {
			state.focusAndZoomType = initialState.focusAndZoomType
			state.servoSettings = initialState.servoSettings
			state.videoQuality = initialState.videoQuality
			state.restartCamera = initialState.restartCamera
			state.showMarkAndColor = initialState.showMarkAndColor
		})
	},
})

export const appConfigActions = appConfigSlice.actions
export const appConfigReducer = appConfigSlice.reducer
