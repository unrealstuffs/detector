import { markupActions } from 'features/SendMarkupConfig'
import { KonvaEventObject } from 'konva/lib/Node'
import { Circle, Group, Layer, Line, Stage } from 'react-konva'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { colors } from '../model/consts/colors'
import { lineWidth, pointSize } from '../model/consts/sizes'

export const EditMarkup = () => {
	const { videoSize, scale } = useTypedSelector(state => state.video)
	const { markupConfig } = useTypedSelector(state => state.markup)
	const { tab } = useTypedSelector(state => state.tabs)

	const dispatch = useAppDispatch()

	const onDragMove = (e: KonvaEventObject<DragEvent>, dir: number, line: number, gate: number, point: number) => {
		const pos = e.target.getAbsolutePosition()
		const box = e.target.getStage()
		if (!box) return

		const { x, y } = pos
		const newPos = { ...pos }

		if (x < 0) {
			newPos.x = 0
		}
		if (y < 0) {
			newPos.y = 0
		}
		if (x > box?.width()) {
			newPos.x = box.width()
		}
		if (y > box?.height()) {
			newPos.y = box.height()
		}
		e.target.setAbsolutePosition(newPos)

		console.log(e.target.x(), e.target.y())

		dispatch(
			markupActions.editLine({
				x: e.target.x(),
				y: e.target.y(),
				dirIndex: dir,
				lineIndex: line,
				gateIndex: gate,
				pointIndex: point,
			})
		)
	}

	return (
		<Stage
			width={videoSize.width * scale}
			height={videoSize.height * scale}
			style={{
				position: 'absolute',
				left: 0,
				top: 0,
				width: '100%',
			}}
			onContextMenu={e => e.evt.preventDefault()}
			scale={{ x: scale, y: scale }}
		>
			<Layer>
				{markupConfig.directs.map(dir =>
					dir.lines.map(line => {
						return (
							<Group key={`${dir.index} ${line.index}`} draggable>
								{line.gates.map(gate => {
									const gatesPoints = gate.gate.map(point => [point.point.x, point.point.y])
									return (
										<>
											<Line
												key={`${dir.index} ${line.index} ${gate.index}`}
												points={gatesPoints.flat()}
												closed
												stroke={colors.lineColor}
												strokeWidth={lineWidth / scale}
												hitStrokeWidth={200}
											/>
											{gate.gate.map(point => (
												<Circle
													key={`${dir.index} ${line.index} ${gate.index} ${point.index}`}
													x={point.point.x}
													y={point.point.y}
													fill={colors.pointColor}
													radius={pointSize / scale}
													draggable={tab === 'shot'}
													onDragMove={e =>
														onDragMove(e, dir.index, line.index, gate.index, point.index)
													}
												/>
											))}
										</>
									)
								})}
							</Group>
						)
					})
				)}
			</Layer>
		</Stage>
	)
}
