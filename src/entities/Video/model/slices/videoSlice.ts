import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FetchStatus } from 'shared/types/FetchStatus'

type VideoQuality = 'lq' | 'mq'

interface VideoSchema {
	videoSize: {
		width: number
		height: number
	}
	quality: VideoQuality
	status: FetchStatus
}

const initialState: VideoSchema = {
	videoSize: { width: 0, height: 0 },
	quality: 'lq',
	status: 'loading',
}

const videoSlice = createSlice({
	name: 'video',
	initialState,
	reducers: {
		setVideoSize(state, action) {
			state.videoSize = action.payload
		},
		setQuality(state, action: PayloadAction<VideoQuality>) {
			state.quality = action.payload
		},
		setStatus(state, action: PayloadAction<FetchStatus>) {
			state.status = action.payload
		},
	},
})

export const videoActions = videoSlice.actions
export const videoReducer = videoSlice.reducer
