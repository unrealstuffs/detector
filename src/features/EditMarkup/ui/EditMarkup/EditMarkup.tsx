import { Layer, Stage } from 'react-konva'
import pointInPolygon from 'point-in-polygon'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { markupActions } from 'features/SendMarkupConfig/model/slices/markupSlice'
import ZonesMarkup from '../ZonesMarkup/ZonesMarkup'
import LinesMarkup from '../LinesMarkup/LinesMarkup'
import CountersMarkup from '../CountersMarkup/CountersMarkup'
import { KonvaEventObject } from 'konva/lib/Node'

export const EditMarkup = () => {
	const { configuration, selectedPolygon } = useTypedSelector(
		state => state.markup
	)
	const { videoSize, scale } = useTypedSelector(state => state.video)
	const { tab } = useTypedSelector(state => state.tabs)

	const getParentPolygon = () => {
		if (selectedPolygon.length === 3) {
			return configuration[selectedPolygon[0]].pl
		}
		if (selectedPolygon.length === 5) {
			return configuration[selectedPolygon[0]].s[selectedPolygon[2]].pl
		}
		return []
	}

	const onClickHandler = (e: KonvaEventObject<MouseEvent>) => {
		if (e.evt.button === 2) return
		if (!selectedPolygon.length) return
		if (tab !== 'shot') return

		const pos = e.target.getStage()?.getPointerPosition()
		if (!pos) return

		if (
			selectedPolygon.length === 1 ||
			pointInPolygon([pos?.x / scale, pos?.y / scale], getParentPolygon())
		)
			markupActions.addPoint({
				keys: selectedPolygon,
				value: [pos?.x / scale, pos?.y / scale],
			})
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
			onClick={onClickHandler}
			scale={{ x: scale, y: scale }}
		>
			<Layer>
				<ZonesMarkup
					configuration={configuration}
					scale={scale}
					tab={tab}
				/>
				<LinesMarkup
					configuration={configuration}
					scale={scale}
					tab={tab}
				/>
				<CountersMarkup
					configuration={configuration}
					scale={scale}
					tab={tab}
				/>
			</Layer>
		</Stage>
	)
}
