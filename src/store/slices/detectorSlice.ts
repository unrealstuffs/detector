import { createSlice } from '@reduxjs/toolkit'

interface DetectorState {
	id: string | null
	configuration: any
	mode: 'zone' | 'line' | 'counter'
	detectorName: string
	detectorConfig: {
		[key: string]: number
	}
}

const emptyConfiguration = {}

const initialState: DetectorState = {
	id: null,
	configuration: emptyConfiguration,
	mode: 'zone',
	detectorName: '',
	detectorConfig: {},
}

const detectorSlice = createSlice({
	name: 'detector',
	initialState,
	reducers: {
		setDetector(state, action) {
			state.id = action.payload.id
		},
		removeDetector(state) {
			state.id = null
		},
		setConfiguration(state, action) {
			state.configuration = action.payload
		},
		removeConfiguration(state) {
			state.configuration = emptyConfiguration
		},
		setMode(state, action) {
			state.mode = action.payload
		},
		setDetectorName(state, action) {
			state.detectorName = action.payload
		},
		setDetectorConfig(state, action) {
			state.detectorConfig = action.payload
		},
	},
})

export const detectorActions = detectorSlice.actions
export const detectorReducer = detectorSlice.reducer
