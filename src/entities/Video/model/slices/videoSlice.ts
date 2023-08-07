import { createSlice } from '@reduxjs/toolkit'
import { FetchStatus } from 'shared/types/FetchStatus'

interface VideoSchema {
	videoSize: {
		width: number
		height: number
	}
	status: FetchStatus
	scale: number
}

const initialState: VideoSchema = {
	videoSize: { width: 0, height: 0 },
	status: 'loading',
	scale: 1,
}

const videoSlice = createSlice({
	name: 'video',
	initialState,
	reducers: {
		setVideoSize(state, action) {
			state.videoSize = action.payload
		},
		setStatus(state, action) {
			state.status = action.payload
		},
		setScale(state, action) {
			state.scale = action.payload
		},
	},
})

export const videoActions = videoSlice.actions
export const videoReducer = videoSlice.reducer
