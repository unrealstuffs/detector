import { colors } from 'features/EditMarkup/model/consts/colors'
import {
	labelFontSize,
	lineWidth,
	pointSize,
} from 'features/EditMarkup/model/consts/sizes'
import {
	getMiddleOfPolygon,
	handleDragMove,
} from 'features/EditMarkup/model/services/editMarkupHelpers'
import { markupActions } from 'features/SendMarkupConfig/model/slices/markupSlice'
import { KonvaEventObject } from 'konva/lib/Node'
import { Fragment } from 'react'
import { Circle, Line, Text } from 'react-konva'
import { MarkupConfig } from 'shared/types/MarkupConfig'

interface LinesMarkupProps {
	configuration: MarkupConfig
	scale: number
	tab: string
}

const LinesMarkup = (props: LinesMarkupProps) => {
	const { configuration, scale, tab } = props

	const onDragMove = (
		e: KonvaEventObject<DragEvent>,
		zone: string,
		line: string,
		index: number
	) => {
		handleDragMove(e, configuration[zone].pl)
		markupActions.editLine({
			x: e.target.x(),
			y: e.target.y(),
			zone,
			line,
			index,
		})
	}

	const onContextMenu = (point: number[]) => {
		if (tab !== 'shot') return
		markupActions.deletePoint([point[0], point[1]])
	}

	return (
		<>
			{Object.keys(configuration).map((zone, zoneIndex) =>
				Object.keys(configuration[zone].s).map((line, lineIndex) => {
					const polygonPoints = configuration[zone].s[line].pl
					const polygonLabel = `d-${zoneIndex + 1} l-${++lineIndex}`

					const { centerX, centerY } =
						getMiddleOfPolygon(polygonPoints)

					return (
						<Fragment key={lineIndex}>
							<Line
								points={polygonPoints.flat()}
								closed
								stroke={colors.lineColor}
								strokeWidth={lineWidth / scale}
							/>

							{polygonPoints.map(
								(point: number[], index: number) => (
									<Circle
										key={index}
										x={point[0]}
										y={point[1]}
										fill={colors.pointColor}
										radius={pointSize / scale}
										draggable={tab === 'shot'}
										onDragMove={e =>
											onDragMove(e, zone, line, index)
										}
										onContextMenu={e =>
											onContextMenu([point[0], point[1]])
										}
									/>
								)
							)}
							{polygonPoints.length >= 2 && (
								<Text
									text={polygonLabel}
									fontSize={labelFontSize / scale}
									x={centerX - labelFontSize / scale}
									y={centerY - labelFontSize / scale}
									fill={colors.lineColor}
								/>
							)}
						</Fragment>
					)
				})
			)}
		</>
	)
}

export default LinesMarkup
