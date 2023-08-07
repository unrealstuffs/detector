import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	Composition,
	DataState,
	Delay,
	Density,
	Intensity,
	Speed,
	TableNameType,
	Type,
} from '../types/Data'
import { fetchTypes } from '../services/fetchTypes'
import { fetchDelay } from '../services/fetchDelay'
import { fetchIntensity } from '../services/fetchIntensity'
import { fetchComposition } from '../services/fetchComposition'
import { fetchDensity } from '../services/fetchDensity'
import { fetchSpeed } from '../services/fetchSpeed'
import { searchTypes } from 'features/SearchData/model/services/searchTypes'
import { searchDelay } from 'features/SearchData/model/services/searchDelay'
import { searchIntensity } from 'features/SearchData/model/services/searchIntensity'
import { searchDensity } from 'features/SearchData/model/services/searchDensity'
import { searchSpeed } from 'features/SearchData/model/services/searchSpeed'
import { searchComposition } from 'features/SearchData/model/services/searchComposition'

const initialState: DataState = {
	types: [],
	intensity: [],
	composition: [],
	speed: [],
	delay: [],
	density: [],
}

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		resetData(state, action: PayloadAction<TableNameType>) {
			state[action.payload] = []
		},
	},
	extraReducers: builder => {
		builder.addCase(
			fetchTypes.fulfilled,
			(state, action: PayloadAction<Type[]>) => {
				state.types?.unshift(...action.payload)
			}
		)
		builder.addCase(
			fetchDelay.fulfilled,
			(state, action: PayloadAction<Delay[]>) => {
				state.delay?.unshift(...action.payload)
			}
		)
		builder.addCase(
			fetchIntensity.fulfilled,
			(state, action: PayloadAction<Intensity[]>) => {
				state.intensity?.unshift(...action.payload)
			}
		)
		builder.addCase(
			fetchComposition.fulfilled,
			(state, action: PayloadAction<Composition[]>) => {
				state.composition?.unshift(...action.payload)
			}
		)
		builder.addCase(
			fetchDensity.fulfilled,
			(state, action: PayloadAction<Density[]>) => {
				state.density?.unshift(...action.payload)
			}
		)
		builder.addCase(
			fetchSpeed.fulfilled,
			(state, action: PayloadAction<Speed[]>) => {
				state.speed?.unshift(...action.payload)
			}
		)
		builder.addCase(
			searchTypes.fulfilled,
			(state, action: PayloadAction<Type[]>) => {
				state.types = action.payload
			}
		)
		builder.addCase(
			searchDelay.fulfilled,
			(state, action: PayloadAction<Delay[]>) => {
				state.delay = action.payload
			}
		)
		builder.addCase(
			searchIntensity.fulfilled,
			(state, action: PayloadAction<Intensity[]>) => {
				state.intensity = action.payload
			}
		)

		builder.addCase(
			searchDensity.fulfilled,
			(state, action: PayloadAction<Density[]>) => {
				state.density = action.payload
			}
		)
		builder.addCase(
			searchSpeed.fulfilled,
			(state, action: PayloadAction<Speed[]>) => {
				state.speed = action.payload
			}
		)
		builder.addCase(
			searchComposition.fulfilled,
			(state, action: PayloadAction<Composition[]>) => {
				state.composition = action.payload
			}
		)
	},
})

export const dataActions = dataSlice.actions
export const dataReducer = dataSlice.reducer
