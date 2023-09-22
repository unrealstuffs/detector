import { colors } from '../../model/consts/colors'
import { labelFontSize, lineWidth, pointSize } from '../../model/consts/sizes'
import {
	getMiddleOfPolygon,
	handleDragMove,
} from '../../model/services/editMarkupHelpers'
import { markupActions } from 'features/SendMarkupConfig/model/slices/markupSlice'
import { KonvaEventObject } from 'konva/lib/Node'
import { Fragment } from 'react'
import { Circle, Line, Text } from 'react-konva'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { MarkupConfig } from 'shared/types/MarkupConfig'

interface CountersMarkupProps {
	configuration: MarkupConfig
	scale: number
	tab: string
}

const CountersMarkup = (props: CountersMarkupProps) => {
	const { configuration, scale, tab } = props
	const dispatch = useAppDispatch()

	const onDragMove = (
		e: KonvaEventObject<DragEvent>,
		zone: string,
		line: string,
		counter: string,
		index: number
	) => {
		handleDragMove(e, configuration[zone].s[line].pl)
		dispatch(
			markupActions.editCounter({
				x: e.target.x(),
				y: e.target.y(),
				zone,
				line,
				counter,
				index,
			})
		)
	}

	const onContextMenu = (point: number[]) => {
		if (tab !== 'shot') return
		dispatch(markupActions.deletePoint([point[0], point[1]]))
	}

	return (
		<>
			{Object.keys(configuration).map((zone, zoneIndex) =>
				Object.keys(configuration[zone].s).map((line, lineIndex) =>
					Object.keys(configuration[zone].s[line].s).map(
						(counter, counterIndex) => {
							const counterPolygon =
								configuration[zone].s[line].s[counter].pl
							const polygonLabel = `d-${zoneIndex + 1} l-${
								lineIndex + 1
							} s-${counterIndex + 1}`

							const { centerX, centerY } =
								getMiddleOfPolygon(counterPolygon)

							return (
								<Fragment key={counterIndex}>
									<Line
										points={counterPolygon.flat()}
										closed
										stroke={colors.conterColor}
										strokeWidth={lineWidth / scale}
									/>

									{counterPolygon.map(
										(point: number[], index: number) => (
											<Circle
												key={index}
												x={point[0]}
												y={point[1]}
												fill={colors.pointColor}
												radius={pointSize / scale}
												draggable={tab === 'shot'}
												onDragMove={e =>
													onDragMove(
														e,
														zone,
														line,
														counter,
														index
													)
												}
												onContextMenu={e =>
													onContextMenu([
														point[0],
														point[1],
													])
												}
											/>
										)
									)}
									{counterPolygon.length >= 2 && (
										<Text
											align='center'
											verticalAlign='center'
											text={polygonLabel}
											fontSize={labelFontSize / scale}
											x={centerX - labelFontSize / scale}
											y={centerY - labelFontSize / scale}
											fill={colors.conterColor}
										/>
									)}
								</Fragment>
							)
						}
					)
				)
			)}
		</>
	)
}

export default CountersMarkup
