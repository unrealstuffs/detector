import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MarkupConfig } from '../types/markupConfig'
import { getMarkupConfig } from '../services/getMarkupConfig'
import { sendMarkupConfig } from '../services/sendMarkupConfig'
import { FetchStatus } from 'shared/types/FetchStatus'

interface MarkupSchema {
	markupConfig: MarkupConfig
	shiftPressed: boolean
	ctrlPressed: boolean
	status: FetchStatus
}

const initialState: MarkupSchema = {
	status: 'init',
	shiftPressed: false,
	ctrlPressed: false,
	markupConfig: {
		version: 21,
		uid: '00000000-0000-0000-0000-000000000000',
		base_size: { width: 0, height: 0 },
		zone: {
			name: 'test',
			index: 1,
			type: 'edge',
			description: '',
			directs: [
				{
					index: 1,
					name: 'прямое',
					is_reverse: false,
					description: '',
					lines: [],
				},
			],
		},
	},
}

const markupSlice = createSlice({
	name: 'markup',
	initialState,
	reducers: {
		addLine(state) {
			const linesLength = state.markupConfig.zone.directs[0].lines.length

			state.markupConfig.zone.directs[0].lines.push({
				index: linesLength + 1,
				name: `полоса-${linesLength + 1}`,
				description: '',
				gates: [
					{
						index: 1,
						type: '',
						width_line: -1,
						gate: [
							{
								index: 1,
								point: { x: 40, y: 20 },
							},
							{
								index: 2,
								point: { x: 60, y: 20 },
							},
						],
					},
					{
						index: 2,
						type: '',
						width_line: -1,
						gate: [
							{
								index: 1,
								point: { x: 40, y: 35 },
							},
							{
								index: 2,
								point: { x: 60, y: 35 },
							},
						],
					},
					{
						index: 3,
						type: '',
						width_line: -1,
						gate: [
							{
								index: 1,
								point: { x: 40, y: 50 },
							},
							{
								index: 2,
								point: { x: 60, y: 50 },
							},
						],
					},
					{
						index: 4,
						type: '',
						width_line: -1,
						gate: [
							{
								index: 1,
								point: { x: 40, y: 65 },
							},
							{
								index: 2,
								point: { x: 60, y: 65 },
							},
						],
					},
					{
						index: 5,
						type: '',
						width_line: -1,
						gate: [
							{
								index: 1,
								point: { x: 40, y: 80 },
							},
							{
								index: 2,
								point: { x: 60, y: 80 },
							},
						],
					},
				],
				lengths: [
					{ index: 1, from_gate: 2, to_gate: 3, length: 0 },
					{ index: 2, from_gate: 3, to_gate: 4, length: 0 },
				],
			})
		},
		setLength(
			state,
			action: PayloadAction<{ dirIndex: number; lineIndex: number; fromTo: number; length: number }>
		) {
			state.markupConfig.zone.directs[action.payload.dirIndex].lines[action.payload.lineIndex].lengths[
				action.payload.fromTo
			].length = action.payload.length
		},
		deleteLine(state, action: PayloadAction<{ dirIndex: number; lineIndex: number }>) {
			state.markupConfig.zone.directs[action.payload.dirIndex - 1].lines.splice(action.payload.lineIndex - 1, 1)

			state.markupConfig.zone.directs[action.payload.dirIndex - 1].lines.forEach((element, index) => {
				element.index = index + 1
			})
		},
		deleteDir(state, action: PayloadAction<{ dirIndex: number }>) {
			if (state.markupConfig.zone.directs.length === 1) {
				return
			}
			state.markupConfig.zone.directs.splice(action.payload.dirIndex - 1, 1)

			state.markupConfig.zone.directs.forEach((element, index) => {
				element.index = index + 1
			})
		},
		setLineName(state, action: PayloadAction<{ dirIndex: number; lineIndex: number; name: string }>) {
			state.markupConfig.zone.directs[action.payload.dirIndex].lines[action.payload.lineIndex].name =
				action.payload.name
		},
		setDirName(state, action: PayloadAction<{ dirIndex: number; name: string }>) {
			state.markupConfig.zone.directs[action.payload.dirIndex].name = action.payload.name
		},
		bindLine(state, action: PayloadAction<{ dirIndex: number; newDirIndex: number; lineIndex: number }>) {
			const sourceDir = state.markupConfig.zone.directs[action.payload.dirIndex - 1]
			const targetDir = state.markupConfig.zone.directs[action.payload.newDirIndex - 1]
			const sourceArray = state.markupConfig.zone.directs[action.payload.dirIndex - 1].lines
			const targetArray = state.markupConfig.zone.directs[action.payload.newDirIndex - 1].lines

			const elementToMoveIndex = sourceArray.findIndex(element => element.index === action.payload.lineIndex)

			// Check if the element exists in the source array
			if (elementToMoveIndex !== -1) {
				// Remove the element from the source array
				const [elementToMove] = sourceArray.splice(elementToMoveIndex, 1)

				// Update the index of the moved element
				elementToMove.index = targetArray.length + 1

				if (
					(sourceDir.is_reverse && !targetDir.is_reverse) ||
					(!sourceDir.is_reverse && targetDir.is_reverse)
				) {
					elementToMove.gates.reverse().forEach((gate, index) => {
						gate.index = index + 1
					})
				}

				// Add the element to the target array
				targetArray.push(elementToMove)

				// Update the "index" fields in the source array
				sourceArray.forEach((element, index) => {
					element.index = index + 1
				})
			}
		},
		editLine(
			state,
			action: PayloadAction<{
				x: number
				y: number
				dirIndex: number
				lineIndex: number
				gateIndex: number
				pointIndex: number
			}>
		) {
			state.markupConfig.zone.directs[action.payload.dirIndex - 1].lines[action.payload.lineIndex - 1].gates[
				action.payload.gateIndex - 1
			].gate[action.payload.pointIndex - 1].point = { x: action.payload.x, y: action.payload.y }
		},
		editGates(
			state,
			action: PayloadAction<{
				x: number
				y: number
				dirIndex: number
				lineIndex: number
			}>
		) {
			state.markupConfig.zone.directs[action.payload.dirIndex - 1].lines[
				action.payload.lineIndex - 1
			].gates.forEach(gate => {
				gate.gate.forEach(point => {
					point.point.x += action.payload.x
					point.point.y += action.payload.y
				})
			})
		},
		alignGates(
			state,
			action: PayloadAction<{
				dirIndex: number
				lineIndex: number
			}>
		) {
			let gatesArray =
				state.markupConfig.zone.directs[action.payload.dirIndex - 1].lines[action.payload.lineIndex - 1].gates
			const firstGate = gatesArray[0]
			const lastGate = gatesArray[4]
			const newMiddleGate = [
				{
					x: (lastGate.gate[0].point.x + firstGate.gate[0].point.x) / 2,
					y: (lastGate.gate[0].point.y + firstGate.gate[0].point.y) / 2,
				},
				{
					x: (lastGate.gate[1].point.x + firstGate.gate[1].point.x) / 2,
					y: (lastGate.gate[1].point.y + firstGate.gate[1].point.y) / 2,
				},
			]

			gatesArray = [
				firstGate,
				{
					index: 2,
					type: '',
					width_line: -1,
					gate: [
						{
							index: 1,
							point: {
								x: (newMiddleGate[0].x + firstGate.gate[0].point.x) / 2,
								y: (newMiddleGate[0].y + firstGate.gate[0].point.y) / 2,
							},
						},
						{
							index: 2,
							point: {
								x: (newMiddleGate[1].x + firstGate.gate[1].point.x) / 2,
								y: (newMiddleGate[1].y + firstGate.gate[1].point.y) / 2,
							},
						},
					],
				},
				{
					index: 3,
					type: '',
					width_line: -1,
					gate: [
						{
							index: 1,
							point: {
								x: newMiddleGate[0].x,
								y: newMiddleGate[0].y,
							},
						},
						{
							index: 2,
							point: {
								x: newMiddleGate[1].x,
								y: newMiddleGate[1].y,
							},
						},
					],
				},
				{
					index: 4,
					type: '',
					width_line: -1,
					gate: [
						{
							index: 1,
							point: {
								x: (lastGate.gate[0].point.x + newMiddleGate[0].x) / 2,
								y: (lastGate.gate[0].point.y + newMiddleGate[0].y) / 2,
							},
						},
						{
							index: 2,
							point: {
								x: (lastGate.gate[1].point.x + newMiddleGate[1].x) / 2,
								y: (lastGate.gate[1].point.y + newMiddleGate[1].y) / 2,
							},
						},
					],
				},
				lastGate,
			]

			state.markupConfig.zone.directs[action.payload.dirIndex - 1].lines[action.payload.lineIndex - 1].gates =
				gatesArray
		},
		addDirection(state) {
			const directsLength = state.markupConfig.zone.directs.length
			state.markupConfig.zone.directs.push({
				index: directsLength + 1,
				name: `направление ${directsLength + 1}`,
				description: '',
				is_reverse: false,
				lines: [],
			})
		},
		setDirection(state, action: PayloadAction<{ dirIndex: number; isReverse: boolean }>) {
			state.markupConfig.zone.directs[action.payload.dirIndex - 1].is_reverse = action.payload.isReverse
		},
		deleteMarkup(state) {
			state.markupConfig = initialState.markupConfig
		},
		setShiftPressed(state, action) {
			if (state.ctrlPressed) state.ctrlPressed = false
			state.shiftPressed = action.payload
		},
		setCtrlPressed(state, action) {
			if (state.shiftPressed) state.shiftPressed = false
			state.ctrlPressed = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(getMarkupConfig.fulfilled, (state, action) => {
			state.markupConfig = action.payload
		})
		builder.addCase(getMarkupConfig.rejected, state => {
			state.markupConfig = initialState.markupConfig
		})
		builder.addCase(sendMarkupConfig.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(sendMarkupConfig.fulfilled, state => {
			state.status = 'success'
		})
		builder.addCase(sendMarkupConfig.rejected, state => {
			state.status = 'error'
		})
	},
})

export const markupReducer = markupSlice.reducer
export const markupActions = markupSlice.actions
