import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getDetectorName } from '../services/fetchDetectorName'

interface DetectorState {
	detectorName: string
}

const initialState: DetectorState = {
	detectorName: '',
}

const detectorNameSlice = createSlice({
	name: 'detector',
	initialState,
	reducers: {
		setDetectorName(state, action) {
			state.detectorName = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(
			getDetectorName.fulfilled,
			(state, action: PayloadAction<string>) => {
				state.detectorName = action.payload
				document.title = `Детектор ID ${action.payload}`
			}
		)
		builder.addCase(getDetectorName.rejected, state => {
			state.detectorName = 'не определен'
			document.title = `Детектор ID не определен`
		})
	},
})

export const detectorNameActions = detectorNameSlice.actions
export const detectorNameReducer = detectorNameSlice.reducer
