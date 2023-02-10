import { createSlice } from '@reduxjs/toolkit'

interface Type {
	timestamp: string
	type: string
}

interface Plate {
	timestamp: string
	licensePlate: string
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
		plates: Plate[]
		intensity: Intensity[]
		composition: Composition[]
		speed: Speed[]
		delay: Delay[]
	}
}

// const initialState: State = {
// 	data: {
// 		types: [],
// 		plates: [],
// 		intensity: [],
// 		composition: [],
// 		speed: [],
// 		delay: [],
// 	},
// }
const initialState: State = {
	data: {
		types: [{ timestamp: '2023-01-14T11:30:00.796759Z', type: 'car' }],
		plates: [
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				licensePlate: '234ert32',
			},
			{
				timestamp: '2023-01-14T11:34:00.796759Z',
				licensePlate: '564ert32',
			},
			{
				timestamp: '2023-01-14T11:09:00.796759Z',
				licensePlate: '267urt32',
			},
			{
				timestamp: '2023-01-14T11:12:00.796759Z',
				licensePlate: '289oit32',
			},
			{
				timestamp: '2023-01-14T11:39:00.796759Z',
				licensePlate: '237art32',
			},
		],
		intensity: [
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direct: 'd_0',
				intensity: 10,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direct: 'd_0',
				intensity: 11,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direct: 'd_0',
				intensity: 12,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direct: 'd_0',
				intensity: 13,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direct: 'd_0',
				intensity: 14,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direct: 'd_0',
				intensity: 15,
			},
		],
		composition: [
			{
				timestamp: '2023-01-14T11:29:00.796759Z',
				direction: 'd_1',
				vehicleType: 'car2',
				quantity: 0,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direction: 'd_0',
				vehicleType: 'car3',
				quantity: 12,
			},
			{
				timestamp: '2023-01-14T11:31:00.796759Z',
				direction: 'd_0',
				vehicleType: 'car4',
				quantity: 46,
			},
		],
		speed: [
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direction: 'd_0',
				avgSpeed: 34,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direction: 'd_0',
				avgSpeed: 43,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direction: 'd_1',
				avgSpeed: 34,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direction: 'd_0',
				avgSpeed: 54,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direction: 'd_1',
				avgSpeed: 65,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direction: 'd_2',
				avgSpeed: 67,
			},
		],
		delay: [
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direction: 'd_0',
				avgDelay: 21,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direction: 'd_0',
				avgDelay: 11,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direction: 'd_0',
				avgDelay: 12,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direction: 'd_0',
				avgDelay: 13,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direction: 'd_0',
				avgDelay: 14,
			},
			{
				timestamp: '2023-01-14T11:30:00.796759Z',
				direction: 'd_0',
				avgDelay: 15,
			},
		],
	},
}

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setData(state, action) {
			state.data.types = action.payload.types
			state.data.plates = action.payload.plates
			state.data.intensity = action.payload.intensity
			state.data.composition = action.payload.composition
			state.data.speed = action.payload.speed
			state.data.delay = action.payload.delay
		},
		removeData(state) {
			state.data = initialState.data
		},
	},
})

export const dataActions = dataSlice.actions
export const dataReducer = dataSlice.reducer
