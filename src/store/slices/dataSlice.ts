import { createSlice } from '@reduxjs/toolkit'

interface Type {
	timestamp: string
	licensePlate: string
	type: string
}

interface Intensity {
	timestamp: string
	direct: string
	intensity: number
}

interface Composition {
	timestamp: string
	direction: string
	vehicleType: string
	quantity: number
}

interface Speed {
	timestamp: string
	direction: string
	avgSpeed: number
}

interface Delay {
	timestamp: string
	direction: string
	avgDelay: number
}

interface State {
	data: {
		types: Type[]
		intensity: Intensity[]
		composition: Composition[]
		speed: Speed[]
		delay: Delay[]
	}
}

const initialState: State = {
	data: {
		types: [],
		intensity: [],
		composition: [],
		speed: [],
		delay: [],
	},
}

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setData(state, action) {
			state.data.types = [...state.data.types, ...action.payload.types]
			state.data.intensity = [
				...state.data.intensity,
				...action.payload.intensity,
			]
			state.data.composition = [
				...state.data.composition,
				...action.payload.composition,
			]
			state.data.speed = [...state.data.speed, ...action.payload.speed]
			state.data.delay = [...state.data.delay, ...action.payload.delay]
		},
		removeData(state) {
			state.data = initialState.data
		},
	},
})

export const dataActions = dataSlice.actions
export const dataReducer = dataSlice.reducer
