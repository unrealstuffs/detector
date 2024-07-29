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

interface EditMarkupProps {
	muted: boolean
}

export const EditMarkup = (props: EditMarkupProps) => {
	const { muted } = props
	const { videoSize } = useTypedSelector(state => state.video)
	const { markupConfig, shiftPressed, ctrlPressed } = useTypedSelector(state => state.markup)
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

		if (ctrlPressed && (gate === 1 || gate === 5)) {
			dispatch(
				markupActions.alignGates({
					dirIndex: dir,
					lineIndex: line,
				})
			)
		}
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
				opacity: muted ? 0.5 : 1,
			}}
			onContextMenu={e => e.evt.preventDefault()}
		>
			<Layer>
				{markupConfig.zone.directs.map(direct =>
					direct.lines.map(line => (
						<Group
							key={`${direct.index} ${line.index}`}
							draggable={tab === 'shot' && shiftPressed}
							onDragEnd={e => onDragLineEnd(e, direct.index, line.index)}
						>
							{line.gates.map(gate => (
								<Fragment key={`${direct.index} ${line.index} ${gate.index}`}>
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
												opacity={shiftPressed ? 1 : 0.6}
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
										stroke={gate.index === 3 ? colors.conterColor : colors.lineColor}
										opacity={gate.index === 1 || gate.index === 5 ? (shiftPressed ? 1 : 0.6) : 1}
										strokeWidth={lineWidth}
										hitStrokeWidth={shiftPressed ? 100 : 0}
									/>
									{gate.gate.map(point => (
										<Fragment key={`${direct.index} ${line.index} ${gate.index} ${point.index}`}>
											{gate.index === 3 && (
												<Text
													x={getValueByPercent(gate.gate[0].point.x, videoSize.width)}
													y={getValueByPercent(gate.gate[0].point.y - 4, videoSize.height)}
													text={`g-3 ${line.name} (${direct.name})`}
													fontSize={labelFontSize}
													fill={colors.conterColor}
												/>
											)}
											{gate.index === 2 && (
												<Text
													x={getValueByPercent(gate.gate[0].point.x, videoSize.width)}
													y={getValueByPercent(gate.gate[0].point.y - 4, videoSize.height)}
													text='g-2'
													fontSize={labelFontSize}
													fill={colors.zoneColor}
												/>
											)}
											{gate.index === 4 && (
												<Text
													x={getValueByPercent(gate.gate[0].point.x, videoSize.width)}
													y={getValueByPercent(gate.gate[0].point.y - 4, videoSize.height)}
													text='g-4'
													fontSize={labelFontSize}
													fill={colors.zoneColor}
												/>
											)}
											<Circle
												x={getValueByPercent(point.point.x, videoSize.width)}
												y={getValueByPercent(point.point.y, videoSize.height)}
												radius={pointSize}
												fill={colors.pointColor}
												draggable={tab === 'shot' && !shiftPressed}
												onDragMove={e =>
													onDragMove(e, direct.index, line.index, gate.index, point.index)
												}
												onDragEnd={e => (e.cancelBubble = true)}
												opacity={
													shiftPressed ||
													(ctrlPressed && gate.index !== 1 && gate.index !== 5)
														? 0.6
														: 1
												}
											/>
										</Fragment>
									))}
								</Fragment>
							))}
						</Group>
					))
				)}
			</Layer>
		</Stage>
	)
}
