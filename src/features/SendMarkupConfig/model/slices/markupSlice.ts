import { createSlice } from '@reduxjs/toolkit'
import { MarkupConfig } from 'shared/types/MarkupConfig'
import { FetchStatus } from 'shared/types/FetchStatus'
import { sendConfiguration } from '../services/sendConfiguration'
import { getConfiguration } from '../services/getConfiguration'

interface ConfigurationState {
	configuration: MarkupConfig
	selectedPolygon: string[]

	status: FetchStatus
}

const initialState: ConfigurationState = {
	configuration: {},
	selectedPolygon: [],
	status: 'init',
}

const markupSlice = createSlice({
	name: 'configuration',
	initialState,
	reducers: {
		addPoint(state, action) {
			const newState: any = { ...state.configuration }
			let currentObj: any = newState

			for (const key of action.payload.keys) {
				currentObj = currentObj[key]
			}
			currentObj.pl.push(action.payload.value)
			state.configuration = newState
		},
		deletePoint(state, action) {
			const _deletePoint = (obj: any, value: number[]): void => {
				for (const key in obj) {
					if (!Array.isArray(obj[key])) {
						_deletePoint(obj[key], value)
					} else if (Array.isArray(obj[key])) {
						const index = obj[key].findIndex(
							(item: number[]) =>
								item[0] === value[0] && item[1] === value[1]
						)
						if (index !== -1) {
							obj[key].splice(index, 1)
						}
					}
				}
				state.configuration = { ...obj }
			}
			_deletePoint(state.configuration, action.payload)
		},
		editZone(state, action) {
			state.configuration[action.payload.zone].pl = state.configuration[
				action.payload.zone
			].pl.map((subarray, subarrayIndex) =>
				action.payload.index === subarrayIndex
					? [action.payload.x, action.payload.y]
					: subarray
			)
		},
		editLine(state, action) {
			state.configuration[action.payload.zone]['s'][
				action.payload.line
			].pl = state.configuration[action.payload.zone]['s'][
				action.payload.line
			].pl.map((subarray, subarrayIndex) =>
				action.payload.index === subarrayIndex
					? [action.payload.x, action.payload.y]
					: subarray
			)
		},
		editCounter(state, action) {
			state.configuration[action.payload.zone]['s'][action.payload.line][
				's'
			][action.payload.counter].pl = state.configuration[
				action.payload.zone
			]['s'][action.payload.line]['s'][action.payload.counter].pl.map(
				(subarray, subarrayIndex) =>
					action.payload.index === subarrayIndex
						? [action.payload.x, action.payload.y]
						: subarray
			)
		},
		setDirection(state, action) {
			state.configuration[action.payload.zone].reverseDirection =
				action.payload.checked
		},
		setLineLength(state, action) {
			state.configuration[action.payload.zone]['s'][
				action.payload.line
			].length = action.payload.value
		},
		addZone(state) {
			const zoneKeys = Object.keys(state.configuration)
			const newKey = `d_0${zoneKeys.length}`

			state.configuration[newKey] = {
				reverseDirection: false,
				pl: [],
				s: {
					l_00: {
						length: 1,
						pl: [],
						s: {
							s_00: {
								pl: [],
							},
						},
					},
				},
			}
		},
		addLine(state) {
			const lineKeys = Object.keys(
				state.configuration[state.selectedPolygon[0]].s
			)
			const newKey = `l_0${lineKeys.length}`

			state.configuration[state.selectedPolygon[0]].s[newKey] = {
				length: 1,
				pl: [],
				s: {
					s_00: {
						pl: [],
					},
				},
			}
		},
		addCounter(state) {
			const counterKeys = Object.keys(
				state.configuration[state.selectedPolygon[0]].s[
					state.selectedPolygon[2]
				].s
			)
			const newKey = `s_0${counterKeys.length}`

			state.configuration[state.selectedPolygon[0]].s[
				state.selectedPolygon[2]
			].s[newKey] = {
				pl: [],
			}
		},
		removeZone(state, action) {
			const updatedConfig = { ...state.configuration }
			const zoneKeys = Object.keys(updatedConfig)
			const keyIndex = zoneKeys.indexOf(action.payload.key)
			if (keyIndex !== -1) {
				const shiftedKeys = [
					...zoneKeys.slice(0, keyIndex),
					...zoneKeys.slice(keyIndex + 1),
				]
				const shiftedState: MarkupConfig = {}
				shiftedKeys.forEach((shiftedKey, index) => {
					const newKey = `d_0${index}`
					shiftedState[newKey] = updatedConfig[shiftedKey]
				})
			}
			delete updatedConfig[action.payload.key]
			if (!Object.keys(updatedConfig).length) state.selectedPolygon = []
			state.configuration = { ...updatedConfig }
		},
		removeLine(state, action) {
			const updatedConfig = { ...state.configuration }
			const lineKeys = Object.keys(
				updatedConfig[action.payload.keys[0]].s
			)
			const keyIndex = lineKeys.indexOf(action.payload.keys[1])
			if (keyIndex !== -1) {
				const shiftedKeys = [
					...lineKeys.slice(0, keyIndex),
					...lineKeys.slice(keyIndex + 1),
				]

				const shiftedState: any = {
					...updatedConfig,
					[`${action.payload.keys[0]}`]: {
						...updatedConfig[`${action.payload.keys[0]}`],
						s: {},
					},
				}
				shiftedKeys.forEach((shiftedKey, index) => {
					const newKey = `l_0${index}`
					shiftedState[action.payload.keys[0]]['s'][newKey] =
						updatedConfig[action.payload.keys[0]].s[shiftedKey]
				})
			}
			delete updatedConfig[action.payload.keys[0]].s[
				action.payload.keys[1]
			]
			if (!Object.keys(updatedConfig[action.payload.keys[0]].s).length)
				state.selectedPolygon = []
			state.configuration = { ...updatedConfig }
		},
		removeCounter(state, action) {
			const updatedConfig = { ...state.configuration }
			const counterKeys = Object.keys(
				updatedConfig[action.payload.keys[0]].s[action.payload.keys[1]]
					.s
			)
			const keyIndex = counterKeys.indexOf(action.payload.keys[2])
			if (keyIndex !== -1) {
				const shiftedKeys = [
					...counterKeys.slice(0, keyIndex),
					...counterKeys.slice(keyIndex + 1),
				]

				const shiftedState: any = {
					...updatedConfig,
					[`${action.payload.keys[0]}`]: {
						...updatedConfig[`${action.payload.keys[0]}`],
						s: {
							...updatedConfig[`${action.payload.keys[0]}`].s,
							[`${action.payload.keys[1]}`]: {
								...updatedConfig[`${action.payload.keys[0]}`].s[
									`${action.payload.keys[1]}`
								],
								s: {},
							},
						},
					},
				}
				shiftedKeys.forEach((shiftedKey, index) => {
					const newKey = `s_0${index}`
					shiftedState[action.payload.keys[0]]['s'][
						action.payload.keys[1]
					]['s'][newKey] =
						updatedConfig[action.payload.keys[0]]['s'][
							action.payload.keys[1]
						]['s'][shiftedKey]
				})
			}
			delete updatedConfig[action.payload.keys[0]]['s'][
				action.payload.keys[1]
			]['s'][action.payload.keys[2]]
			if (
				!Object.keys(
					updatedConfig[action.payload.keys[0]]['s'][
						action.payload.keys[1]
					]['s']
				).length
			)
				state.selectedPolygon = []
			state.configuration = { ...updatedConfig }
		},
		setConfiguration(state, action) {
			state.configuration = action.payload
		},
		removeConfiguration(state) {
			state.configuration = {}
			state.selectedPolygon = []
		},
		setSelectedPolygon(state, action) {
			state.selectedPolygon = action.payload
		},
		setStatus(state, action) {
			state.status = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(getConfiguration.fulfilled, (state, action) => {
			state.configuration = action.payload
		})
		builder.addCase(sendConfiguration.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(sendConfiguration.fulfilled, state => {
			state.status = 'success'
		})
		builder.addCase(sendConfiguration.rejected, state => {
			state.status = 'error'
		})
	},
})

export const markupActions = markupSlice.actions
export const markupReducer = markupSlice.reducer
