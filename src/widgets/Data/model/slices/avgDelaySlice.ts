import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AvgDelay, AvgDelaySchema, AvgDelaySearch } from '../types/AvgDelay'
import { fetchAvgDelay } from '../api/fetchAvgDelay'
import { searchAvgDelay } from '../api/searchAvgDelay'

const initialSearchObject: AvgDelaySearch = {
	directions: [],
	lines: [],
	avgDelay: { value: '', statement: 'more' },
	timestampRange: {
		from: '',
		to: '',
	},
}

const initialState: AvgDelaySchema = {
	data: [],
	status: 'init',
	tableRows: 30,
	searchObject: initialSearchObject,
	blockFetching: false,
}

const avgDelaySlice = createSlice({
	name: 'dataAvgDelay',
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
		setDirections: (state, action: PayloadAction<string>) => {
			state.searchObject.directions = [action.payload]
		},
		setLines: (state, action: PayloadAction<string>) => {
			state.searchObject.lines = [action.payload]
		},
		setAvgDelayStatement: (state, action: PayloadAction<string>) => {
			state.searchObject.avgDelay.statement = action.payload
		},
		setAvgDelayValue: (state, action: PayloadAction<string>) => {
			state.searchObject.avgDelay.value = action.payload
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
			fetchAvgDelay.fulfilled,
			(state, action: PayloadAction<AvgDelay[]>) => {
				state.data.unshift(...action.payload)
			}
		)
		builder.addCase(searchAvgDelay.pending, state => {
			state.blockFetching = true
			state.status = 'loading'
		})
		builder.addCase(
			searchAvgDelay.fulfilled,
			(state, action: PayloadAction<AvgDelay[]>) => {
				state.status = action.payload.length ? 'success' : 'nodata'
				state.data = action.payload
			}
		)
		builder.addCase(searchAvgDelay.rejected, state => {
			state.status = 'error'
		})
	},
})

export const avgDelayActions = avgDelaySlice.actions
export const avgDelayReducer = avgDelaySlice.reducer
