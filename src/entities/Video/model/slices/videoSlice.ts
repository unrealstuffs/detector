import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FetchStatus } from 'shared/types/FetchStatus'

interface VideoSchema {
	videoSize: {
		width: number
		height: number
	}
	status: FetchStatus
}

const initialState: VideoSchema = {
	videoSize: { width: 0, height: 0 },
	status: 'loading',
}

const videoSlice = createSlice({
	name: 'video',
	initialState,
	reducers: {
		setVideoSize(state, action) {
			state.videoSize = action.payload
		},
		setStatus(state, action: PayloadAction<FetchStatus>) {
			state.status = action.payload
		},
	},
})

export const videoActions = videoSlice.actions
export const videoReducer = videoSlice.reducer
