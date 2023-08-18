import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AvgSpeed, AvgSpeedSchema, AvgSpeedSearch } from '../types/AvgSpeed'
import { fetchAvgSpeed } from '../api/fetchAvgSpeed'
import { searchAvgSpeed } from '../api/searchAvgSpeed'

const initialSearchObject: AvgSpeedSearch = {
	directions: [],
	lines: [],
	avgSpeed: { value: '', statement: 'more' },
	timestampRange: {
		from: '',
		to: '',
	},
}

const initialState: AvgSpeedSchema = {
	data: [],
	status: 'init',
	tableRows: 30,
	searchObject: initialSearchObject,
}

const avgSpeedSlice = createSlice({
	name: 'dataAvgSpeed',
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
		setDirections: (state, action: PayloadAction<string>) => {
			state.searchObject.directions = [action.payload]
		},
		setLines: (state, action: PayloadAction<string>) => {
			state.searchObject.lines = [action.payload]
		},
		setAvgSpeedStatement: (state, action: PayloadAction<string>) => {
			state.searchObject.avgSpeed.statement = action.payload
		},
		setAvgSpeedValue: (state, action: PayloadAction<string>) => {
			state.searchObject.avgSpeed.value = action.payload
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
	},
	extraReducers: builder => {
		builder.addCase(
			fetchAvgSpeed.fulfilled,
			(state, action: PayloadAction<AvgSpeed[]>) => {
				state.data.unshift(...action.payload)
			}
		)
		builder.addCase(searchAvgSpeed.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(
			searchAvgSpeed.fulfilled,
			(state, action: PayloadAction<AvgSpeed[]>) => {
				state.status = action.payload.length ? 'success' : 'nodata'
				state.data = action.payload
			}
		)
		builder.addCase(searchAvgSpeed.rejected, state => {
			state.status = 'error'
		})
	},
})

export const avgSpeedActions = avgSpeedSlice.actions
export const avgSpeedReducer = avgSpeedSlice.reducer
