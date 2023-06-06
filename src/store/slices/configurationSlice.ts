import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Config } from '../../types/Config'
import { Fetch } from '../../types/Fetch'

interface ConfigurationState {
	configuration: Config
	selectedPolygon: string[]
	videoSize: { width: number; height: number }
	status: Fetch
}

const initialState: ConfigurationState = {
	configuration: {
		d_00: {
			pl: [
				[0.7582222222222222, 272.37244444444445],
				[1.5164444444444445, 1.5164444444444445],
				[846.9342222222223, 2.2746666666666666],
				[849.208888888889, 474.64711111111114],
			],
			reverseDirection: false,
			s: {
				l_00: {
					length: 3,
					pl: [
						[4.549333333333333, 466.3066666666667],
						[4.549333333333333, 4.549333333333333],
						[840.8684444444444, 4.549333333333333],
						[842.3848888888889, 470.09777777777776],
					],
					s: {},
				},
			},
		},
	},
	selectedPolygon: [],
	videoSize: { width: 0, height: 0 },
	status: 'init',
}

export const getConfiguration = createAsyncThunk(
	'configuration/getConfiguration',
	async (accessToken: string) => {
		const response = await fetch(`${process.env.REACT_APP_EDIT_ZONE_URL}`, {
			method: 'GET',
			headers: {
				Authorization: `${accessToken}`,
			},
		})
		const data = await response.json()

		const tempArr = JSON.parse(data.data)
		return tempArr.zone.r_00.s
	}
)

export const sendConfiguration = createAsyncThunk(
	'configuration/sendConfiguration',
	async (args: { accessToken: string; body: any }) => {
		const { accessToken, body } = args
		const response = await fetch(`${process.env.REACT_APP_EDIT_ZONE_URL}`, {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				Authorization: `${accessToken}`,
			},
		})
		const data = await response.json()

		return data
	}
)

const configurationSlice = createSlice({
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
				const shiftedState: Config = {}
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
		setVideoSize(state, action) {
			state.videoSize = action.payload
		},
	},
	extraReducers: builder => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(getConfiguration.fulfilled, (state, action) => {
			// Add user to the state array
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

export const configurationActions = configurationSlice.actions
export const configurationReducer = configurationSlice.reducer
