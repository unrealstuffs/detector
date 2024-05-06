import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { searchComposition } from '../api/searchComposition'
import { fetchComposition } from '../api/fetchComposition'
import { Composition, CompositionSchema, CompositionSearch } from '../types/Composition'
import { checkArrayLimit } from '../services/checkArrayLimit'

const initialSearchObject: CompositionSearch = {
	vehicleTypes: [],
	directions: [],
	lines: [],
	interval: 60 * 15,
	quantity: { value: '', statement: 'more' },
	timestampRange: {
		from: '',
		to: '',
	},
}

const initialState: CompositionSchema = {
	data: [],
	status: 'init',
	tableRows: 30,
	searchObject: initialSearchObject,
	blockFetching: false,
}

const compositionSlice = createSlice({
	name: 'dataComposition',
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
		setVehicleTypes: (state, action: PayloadAction<string[]>) => {
			state.searchObject.vehicleTypes = [...action.payload]
		},
		setDirections: (state, action: PayloadAction<string[]>) => {
			state.searchObject.directions = [...action.payload]
		},
		setLines: (state, action: PayloadAction<string[]>) => {
			state.searchObject.lines = [...action.payload]
		},
		setInterval: (state, action: PayloadAction<number>) => {
			state.searchObject.interval = action.payload
		},
		setQuantityStatement: (state, action: PayloadAction<string>) => {
			state.searchObject.quantity.statement = action.payload
		},
		setQuantityValue: (state, action: PayloadAction<string>) => {
			state.searchObject.quantity.value = action.payload
		},
		setTimestampRangeFrom: (state, action: PayloadAction<string | Date>) => {
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
		builder.addCase(fetchComposition.fulfilled, (state, action: PayloadAction<Composition[]>) => {
			state.data.unshift(...checkArrayLimit(action.payload))
		})
		builder.addCase(searchComposition.pending, state => {
			state.data = []
			state.blockFetching = true
			state.status = 'loading'
		})
		builder.addCase(searchComposition.fulfilled, (state, action: PayloadAction<Composition[]>) => {
			state.status = action.payload.length ? 'success' : 'nodata'
			state.data = checkArrayLimit(action.payload)
		})
		builder.addCase(searchComposition.rejected, state => {
			state.status = 'error'
		})
	},
})

export const compositionActions = compositionSlice.actions
export const compositionReducer = compositionSlice.reducer
