import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Intensity, IntensitySchema, IntensitySearch } from '../types/Intensity'
import { fetchIntensity } from '../api/fetchIntensity'
import { searchIntensity } from '../api/searchIntensity'
import { checkArrayLimit } from '../services/checkArrayLimit'

const initialSearchObject: IntensitySearch = {
	directions: [],
	lines: [],
	intensity: { value: '', statement: 'more' },
	timestampRange: {
		from: '',
		to: '',
	},
}

const initialState: IntensitySchema = {
	data: [],
	status: 'init',
	tableRows: 30,
	searchObject: initialSearchObject,
	blockFetching: false,
}

const intensitySlice = createSlice({
	name: 'dataIntensity',
	initialState,
	reducers: {
		setTableRows: (state, action: PayloadAction<number>) => {
			state.tableRows = action.payload
		},
		resetData: state => {
			state.data = []
		},
		resetSearchData: state => {
			state.searchObject = initialSearchObject
		},
		resetStatus: state => {
			state.status = 'init'
		},
		setDirections: (state, action: PayloadAction<string[]>) => {
			state.searchObject.directions = [...action.payload]
		},
		setLines: (state, action: PayloadAction<string[]>) => {
			state.searchObject.lines = [...action.payload]
		},
		setIntensityStatement: (state, action: PayloadAction<string>) => {
			state.searchObject.intensity.statement = action.payload
		},
		setIntensityValue: (state, action: PayloadAction<string>) => {
			state.searchObject.intensity.value = action.payload
		},
		setTimestampRangeFrom: (
			state,
			action: PayloadAction<string | Date>
		) => {
			state.searchObject.timestampRange.from = action.payload
		},
		setTimestampRangeTo: (state, action: PayloadAction<string | Date>) => {
			state.searchObject.timestampRange.to = action.payload
		},
		resetBlockFetching: state => {
			state.blockFetching = false
		},
	},
	extraReducers: builder => {
		builder.addCase(
			fetchIntensity.fulfilled,
			(state, action: PayloadAction<Intensity[]>) => {
				state.data.unshift(...checkArrayLimit(action.payload))
			}
		)
		builder.addCase(searchIntensity.pending, state => {
			state.data = []
			state.blockFetching = true
			state.status = 'loading'
		})
		builder.addCase(
			searchIntensity.fulfilled,
			(state, action: PayloadAction<Intensity[]>) => {
				state.status = action.payload.length ? 'success' : 'nodata'
				state.data = checkArrayLimit(action.payload)
			}
		)
		builder.addCase(searchIntensity.rejected, state => {
			state.status = 'error'
		})
	},
})

export const intensityActions = intensitySlice.actions
export const intensityReducer = intensitySlice.reducer
