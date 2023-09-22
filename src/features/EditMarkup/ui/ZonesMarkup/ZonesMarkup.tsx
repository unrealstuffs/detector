import { Fragment } from 'react'
import { getMiddleOfPolygon } from '../../model/services/editMarkupHelpers'
import { Circle, Line, Text } from 'react-konva'
import { colors } from '../../model/consts/colors'
import { labelFontSize, lineWidth, pointSize } from '../../model/consts/sizes'
import { markupActions } from 'features/SendMarkupConfig/model/slices/markupSlice'
import { MarkupConfig } from 'shared/types/MarkupConfig'
import { KonvaEventObject } from 'konva/lib/Node'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

interface ZonesMarkupProps {
	configuration: MarkupConfig
	scale: number
	tab: string
}

const ZonesMarkup = (props: ZonesMarkupProps) => {
	const { configuration, scale, tab } = props
	const dispatch = useAppDispatch()

	const onDragMove = (
		e: KonvaEventObject<DragEvent>,
		zone: string,
		index: number
	) => {
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
			markupActions.editZone({
				x: e.target.x(),
				y: e.target.y(),
				zone,
				index,
			})
		)
	}

	const onContextMenuHandler = (points: number[]) => {
		if (tab !== 'shot') return
		dispatch(markupActions.deletePoint([points[0], points[1]]))
	}

	return (
		<>
			{Object.keys(configuration).map((zone, zoneIndex) => {
				const polygon = configuration[zone]
				const polygonPoints = polygon.pl
				const isReverse = polygon.reverseDirection
				const zoneName = `d-${zoneIndex + 1}`
				const directionLabel = isReverse ? '(Обратное)' : ''
				const polygonLabel = `${zoneName} ${directionLabel}`

				const { centerX, centerY } = getMiddleOfPolygon(polygonPoints)

				return (
					<Fragment key={zoneIndex}>
						<Line
							points={polygonPoints.flat()}
							closed
							stroke={colors.zoneColor}
							strokeWidth={lineWidth / scale}
						/>

						{polygonPoints.map((point: number[], index: number) => (
							<Circle
								key={index}
								x={point[0]}
								y={point[1]}
								fill={colors.pointColor}
								radius={pointSize / scale}
								draggable={tab === 'shot'}
								onDragMove={e => onDragMove(e, zone, index)}
								onContextMenu={() =>
									onContextMenuHandler([point[0], point[1]])
								}
							/>
						))}
						{polygonPoints.length >= 2 && (
							<Text
								text={polygonLabel}
								fontSize={labelFontSize / scale}
								x={centerX - labelFontSize / scale}
								y={centerY - labelFontSize / scale}
								fill={colors.zoneColor}
							/>
						)}
					</Fragment>
				)
			})}
		</>
	)
}

export default ZonesMarkup
