import { Fragment } from 'react'
import { markupActions } from 'features/SendMarkupConfig'
import { KonvaEventObject } from 'konva/lib/Node'
import { Circle, Group, Layer, Line, Stage, Text } from 'react-konva'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { colors } from '../model/consts/colors'
import { labelFontSize, lineWidth, pointSize } from '../model/consts/sizes'
import { getValueByPercent } from 'shared/lib/getValueByPercent'
import { getPercentOfValue } from 'shared/lib/getPercentOfValue'

export const EditMarkup = () => {
	const { videoSize } = useTypedSelector(state => state.video)
	const { markupConfig } = useTypedSelector(state => state.markup)
	const { tab } = useTypedSelector(state => state.tabs)

	const dispatch = useAppDispatch()

	const onDragMove = (e: KonvaEventObject<DragEvent>, dir: number, line: number, gate: number, point: number) => {
		e.cancelBubble = true
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

		dispatch(
			markupActions.editLine({
				x: getPercentOfValue(e.target.x(), videoSize.width),
				y: getPercentOfValue(e.target.y(), videoSize.height),
				dirIndex: dir,
				lineIndex: line,
				gateIndex: gate,
				pointIndex: point,
			})
		)
	}
	const onDragLineEnd = (e: KonvaEventObject<DragEvent>, dir: number, line: number) => {
		const pos = e.target.position()

		e.target.position({ x: 0, y: 0 })

		dispatch(
			markupActions.editGates({
				dirIndex: dir,
				lineIndex: line,
				x: getPercentOfValue(pos.x, videoSize.width),
				y: getPercentOfValue(pos.y, videoSize.height),
			})
		)
	}

	return (
		<Stage
			width={videoSize.width}
			height={videoSize.height}
			style={{
				position: 'absolute',
				left: 0,
				top: 0,
				width: '100%',
			}}
			onContextMenu={e => e.evt.preventDefault()}
		>
			<Layer>
				{markupConfig.zone.directs.map(direct =>
					direct.lines.map(line => (
						<Group
							key={`${direct.index} ${line.index}`}
							draggable={tab === 'shot'}
							onDragEnd={e => onDragLineEnd(e, direct.index, line.index)}
						>
							{line.gates.map(gate => (
								<>
									{gate.index !== 5 &&
										[0, 1].map(gateIndex => (
											<Line
												key={gateIndex}
												points={[
													getValueByPercent(
														line.gates[gate.index - 1].gate[gateIndex].point.x,
														videoSize.width
													),
													getValueByPercent(
														line.gates[gate.index - 1].gate[gateIndex].point.y,
														videoSize.height
													),
													getValueByPercent(
														line.gates[gate.index].gate[gateIndex].point.x,
														videoSize.width
													),
													getValueByPercent(
														line.gates[gate.index].gate[gateIndex].point.y,
														videoSize.height
													),
												]}
												stroke={colors.lineColor}
												strokeWidth={lineWidth}
											/>
										))}
									<Line
										points={[
											getValueByPercent(gate.gate[0].point.x, videoSize.width),
											getValueByPercent(gate.gate[0].point.y, videoSize.height),
											getValueByPercent(gate.gate[1].point.x, videoSize.width),
											getValueByPercent(gate.gate[1].point.y, videoSize.height),
										]}
										stroke={colors.lineColor}
										strokeWidth={lineWidth}
										hitStrokeWidth={100}
									/>
									{gate.gate.map(point => (
										<Fragment key={`${direct.index} ${line.index} ${gate.index} ${point.index}`}>
											{gate.index === 5 && (
												<Text
													x={
														getValueByPercent(
															(gate.gate[0].point.x + gate.gate[1].point.x) / 2,
															videoSize.width
														) -
														labelFontSize / 2
													}
													y={getValueByPercent(
														(gate.gate[0].point.y + gate.gate[1].point.y) / 2 + 3,
														videoSize.height
													)}
													text={line.name}
													fontSize={labelFontSize}
													fill={colors.conterColor}
												/>
											)}

											<Circle
												x={getValueByPercent(point.point.x, videoSize.width)}
												y={getValueByPercent(point.point.y, videoSize.height)}
												radius={pointSize}
												fill={colors.pointColor}
												draggable={tab === 'shot'}
												onDragMove={e =>
													onDragMove(e, direct.index, line.index, gate.index, point.index)
												}
												onDragEnd={e => (e.cancelBubble = true)}
											/>
										</Fragment>
									))}
								</>
							))}
						</Group>
					))
				)}
			</Layer>
		</Stage>
	)
}
