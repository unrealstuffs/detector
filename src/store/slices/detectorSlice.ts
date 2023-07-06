import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface DetectorState {
	detectorName: string
}

const initialState: DetectorState = {
	detectorName: '',
}

export const getDetectorName = createAsyncThunk(
	'detector/getDetectorName',
	async (accessToken: string) => {
		const response = await fetch(
			`${process.env.REACT_APP_DEVICE_HOSTNAME}`,
			{
				headers: {
					Authorization: `${accessToken}`,
				},
			}
		)
		const data = await response.json()
		if (data.result) {
			return data.data
		}
	}
)

const detectorSlice = createSlice({
	name: 'detector',
	initialState,
	reducers: {
		setDetectorName(state, action) {
			state.detectorName = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(getDetectorName.fulfilled, (state, action) => {
			state.detectorName = action.payload
		})
		builder.addCase(getDetectorName.rejected, state => {
			state.detectorName = 'не определен'
		})
	},
})

export const detectorActions = detectorSlice.actions
export const detectorReducer = detectorSlice.reducer
