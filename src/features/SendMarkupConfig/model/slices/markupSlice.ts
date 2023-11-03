import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MarkupConfig } from '../types/markupConfig'

interface MarkupSchema {
	markupConfig: MarkupConfig
}

const initialState: MarkupSchema = {
	markupConfig: {
		directs: [
			{
				index: 1,
				name: 'd-1',
				is_reverse: false,
				lines: [],
			},
		],
	},
}

const markupSlice = createSlice({
	name: 'markup',
	initialState,
	reducers: {
		addLine(
			state,
			action: PayloadAction<{
				width: number
				height: number
				scale: number
			}>
		) {
			const linesLength = state.markupConfig.directs[0].lines.length
			const canvasMiddleX = action.payload.width / 2
			const canvasMiddleY = action.payload.height / 2
			const initialSize = action.payload.width / 7

			state.markupConfig.directs[0].lines.push({
				index: linesLength + 1,
				name: `l-${linesLength + 1}`,
				gates: [
					{
						index: 1,
						gate: [
							{ index: 1, point: { x: canvasMiddleX - initialSize, y: canvasMiddleY - initialSize } },
							{ index: 2, point: { x: canvasMiddleX + initialSize, y: canvasMiddleY - initialSize } },
						],
					},
					{
						index: 2,
						gate: [
							{
								index: 1,
								point: { x: canvasMiddleX - initialSize, y: (canvasMiddleY * 2 - initialSize) / 2 },
							},
							{
								index: 2,
								point: { x: canvasMiddleX + initialSize, y: (canvasMiddleY * 2 - initialSize) / 2 },
							},
						],
					},
					{
						index: 3,
						gate: [
							{
								index: 1,
								point: { x: canvasMiddleX - initialSize, y: canvasMiddleY },
							},
							{
								index: 2,
								point: { x: canvasMiddleX + initialSize, y: canvasMiddleY },
							},
						],
					},
					{
						index: 4,
						gate: [
							{
								index: 1,
								point: { x: canvasMiddleX - initialSize, y: (canvasMiddleY * 2 + initialSize) / 2 },
							},
							{
								index: 2,
								point: { x: canvasMiddleX + initialSize, y: (canvasMiddleY * 2 + initialSize) / 2 },
							},
						],
					},
					{
						index: 5,
						gate: [
							{ index: 1, point: { x: canvasMiddleX - initialSize, y: canvasMiddleY + initialSize } },
							{ index: 2, point: { x: canvasMiddleX + initialSize, y: canvasMiddleY + initialSize } },
						],
					},
				],
				length: 1,
			})
		},
		bindLine(state, action: PayloadAction<{ dirIndex: number; newDirIndex: number; lineIndex: number }>) {
			const sourceArray = state.markupConfig.directs[action.payload.dirIndex - 1].lines
			const targetArray = state.markupConfig.directs[action.payload.newDirIndex - 1].lines

			const elementToMoveIndex = sourceArray.findIndex(element => element.index === action.payload.lineIndex)

			// Check if the element exists in the source array
			if (elementToMoveIndex !== -1) {
				// Remove the element from the source array
				const [elementToMove] = sourceArray.splice(elementToMoveIndex, 1)

				// Update the index of the moved element
				elementToMove.index = targetArray.length + 1

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
			state.markupConfig.directs[action.payload.dirIndex - 1].lines[action.payload.lineIndex - 1].gates[
				action.payload.gateIndex - 1
			].gate[action.payload.pointIndex - 1].point = { x: action.payload.x, y: action.payload.y }
		},
		addDirection(state) {
			const directsLength = state.markupConfig.directs.length
			state.markupConfig.directs.push({
				index: directsLength + 1,
				name: `d-${directsLength + 1}`,
				is_reverse: false,
				lines: [],
			})
		},
	},
})

export const markupReducer = markupSlice.reducer
export const markupActions = markupSlice.actions
