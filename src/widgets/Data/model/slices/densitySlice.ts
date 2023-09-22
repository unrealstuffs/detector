import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Density, DensitySchema, DensitySearch } from '../types/Density'
import { fetchDensity } from '../api/fetchDensity'
import { searchDensity } from '../api/searchDensity'

const initialSearchObject: DensitySearch = {
	directions: [],
	lines: [],
	density: { value: '', statement: 'more' },
	timestampRange: {
		from: '',
		to: '',
	},
}

const initialState: DensitySchema = {
	data: [],
	status: 'init',
	tableRows: 30,
	searchObject: initialSearchObject,
	blockFetching: false,
}

const densitySlice = createSlice({
	name: 'dataDensity',
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
		setDensityStatement: (state, action: PayloadAction<string>) => {
			state.searchObject.density.statement = action.payload
		},
		setDensityValue: (state, action: PayloadAction<string>) => {
			state.searchObject.density.value = action.payload
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
			fetchDensity.fulfilled,
			(state, action: PayloadAction<Density[]>) => {
				state.data.unshift(...action.payload)
			}
		)
		builder.addCase(searchDensity.pending, state => {
			state.blockFetching = true
			state.status = 'loading'
		})
		builder.addCase(
			searchDensity.fulfilled,
			(state, action: PayloadAction<Density[]>) => {
				state.status = action.payload.length ? 'success' : 'nodata'
				state.data = action.payload
			}
		)
		builder.addCase(searchDensity.rejected, state => {
			state.status = 'error'
		})
	},
})

export const densityActions = densitySlice.actions
export const densityReducer = densitySlice.reducer
