import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchTypes } from '../api/fetchTypes'
import { searchTypes } from '../api/searchTypes'
import { Type, TypesSchema, TypesSearch } from '../types/Types'

const initialSearchObject: TypesSearch = {
	licensePlates: [],
	vehicleTypes: [],
	directions: [],
	lines: [],
	timestampRange: {
		from: '',
		to: '',
	},
}

const initialState: TypesSchema = {
	data: [],
	status: 'init',
	tableRows: 30,
	searchObject: initialSearchObject,
}

const typesSlice = createSlice({
	name: 'dataTypes',
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
		setLicensePlates: (state, action: PayloadAction<string>) => {
			state.searchObject.licensePlates = [action.payload]
		},
		setVehicleTypes: (state, action: PayloadAction<string>) => {
			state.searchObject.vehicleTypes = [action.payload]
		},
		setDirections: (state, action: PayloadAction<string>) => {
			state.searchObject.directions = [action.payload]
		},
		setLines: (state, action: PayloadAction<string>) => {
			state.searchObject.lines = [action.payload]
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
			fetchTypes.fulfilled,
			(state, action: PayloadAction<Type[]>) => {
				state.data.unshift(...action.payload)
			}
		)
		builder.addCase(searchTypes.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(
			searchTypes.fulfilled,
			(state, action: PayloadAction<Type[]>) => {
				state.status = action.payload.length ? 'success' : 'nodata'
				state.data = action.payload
			}
		)
		builder.addCase(searchTypes.rejected, state => {
			state.status = 'error'
		})
	},
})

export const typesActions = typesSlice.actions
export const typesReducer = typesSlice.reducer
