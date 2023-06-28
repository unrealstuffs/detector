import React, { useRef, useState, useEffect, Fragment } from 'react'
import { Stage, Layer, Line, Circle, Text } from 'react-konva'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'

import styles from './Video.module.scss'

interface VideoProps {
	videoSrc: string
}

const colors = {
	pointColor: '#3E445B',
	zoneColor: '#D92128',
	lineColor: '#FFDC00',
	conterColor: '#00C0F2',
}

const pointSize = 8
const labelFontSize = 20

const Video: React.FC<VideoProps> = ({ videoSrc }) => {
	const { configuration, selectedPolygon, videoSize } = useTypedSelector(
		state => state.configuration
	)
	const { tab } = useTypedSelector(state => state.tabs)
	const {
		addPoint,
		deletePoint,
		editZone,
		editLine,
		editCounter,
		setVideoSize,
	} = useActions()

	const videoRef = useRef<HTMLVideoElement>(null)
	const [scale, setScale] = useState(1)
	const [videoLoading, setVideoLoading] = useState(true)

	useEffect(() => {
		const video = videoRef.current

		video?.addEventListener('loadedmetadata', () => {
			setVideoLoading(false)
			setVideoSize({
				width: video.videoWidth,
				height: video.videoHeight,
			})
			setScale(video?.offsetWidth / video?.videoWidth)
		})

		return () => {
			video?.removeEventListener('loadedmetadata', () => {})
		}
	}, [setVideoSize])

	useEffect(() => {
		const video = videoRef.current
		if (tab === 'shot') {
			video?.pause()
		}
		if (tab !== 'shot' && video?.paused) {
			setVideoLoading(true)
			video.load()
			video.play()
		}
	}, [tab])

	return (
		<div className={styles.video}>
			<div className={styles.videoContainer}>
				{videoLoading && (
					<img
						className={styles.loader}
						src='/assets/loader.gif'
						alt='Loading...'
						width={60}
					/>
				)}

				<video
					ref={videoRef}
					src={videoSrc}
					autoPlay
					width='100%'
					loop
					muted
				/>
				<Stage
					width={videoSize.width * scale}
					height={videoSize.height * scale}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						width: '100%',
					}}
					onClick={e => {
						e.evt.preventDefault()
						if (!selectedPolygon.length) return
						if (tab !== 'shot') return

						const pos = e.target.getStage()?.getPointerPosition()

						if (pos)
							addPoint({
								keys: selectedPolygon,
								value: [pos?.x / scale, pos?.y / scale],
							})
					}}
					onContextMenu={e => {
						e.evt.preventDefault()
					}}
					scale={{ x: scale, y: scale }}
				>
					<Layer>
						{Object.keys(configuration).map((zone, zoneIndex) => (
							<Fragment key={zoneIndex}>
								<Line
									points={configuration[zone].pl.flat()}
									closed
									stroke={colors.zoneColor}
								/>

								{configuration[zone].pl.map((point, index) => (
									<Circle
										key={index}
										x={point[0]}
										y={point[1]}
										fill={colors.pointColor}
										radius={pointSize / scale}
										draggable={tab === 'shot'}
										onDragEnd={e => {
											e.evt.stopPropagation()
											editZone({
												x: e.target.x(),
												y: e.target.y(),
												zone,
												index,
											})
										}}
										onContextMenu={e => {
											e.evt.preventDefault()
											e.evt.stopPropagation()
											if (tab !== 'shot') return
											deletePoint([point[0], point[1]])
										}}
									/>
								))}
								{configuration[zone].pl.length >= 2 && (
									<Text
										text={`d-${zoneIndex + 1} ${
											configuration[zone].reverseDirection
												? '(Обратное)'
												: ''
										}`}
										fontSize={labelFontSize / scale}
										x={
											configuration[zone].pl[0][0] +
											(configuration[zone].pl[1][0] -
												configuration[zone].pl[0][0]) *
												0.5
										}
										y={
											configuration[zone].pl[0][1] +
											(configuration[zone].pl[1][1] -
												configuration[zone].pl[0][1]) *
												0.5 -
											15
										}
										fill={colors.zoneColor}
										align='center'
									/>
								)}
							</Fragment>
						))}
						{Object.keys(configuration).map((zone, zoneIndex) =>
							Object.keys(configuration[zone].s).map(
								(line, lineIndex) => (
									<Fragment key={lineIndex}>
										<Line
											points={configuration[zone].s[
												line
											].pl.flat()}
											closed
											stroke={colors.lineColor}
										/>

										{configuration[zone].s[line].pl.map(
											(point, index) => (
												<Circle
													key={index}
													x={point[0]}
													y={point[1]}
													fill={colors.pointColor}
													radius={pointSize / scale}
													draggable={tab === 'shot'}
													onClick={e =>
														e.evt.stopPropagation()
													}
													onDragEnd={e => {
														e.evt.stopPropagation()
														editLine({
															x: e.target.x(),
															y: e.target.y(),
															zone,
															line,
															index,
														})
													}}
													onContextMenu={e => {
														e.evt.stopPropagation()
														e.evt.preventDefault()
														if (tab !== 'shot')
															return
														deletePoint([
															point[0],
															point[1],
														])
													}}
												/>
											)
										)}
										{configuration[zone].s[line].pl
											.length >= 2 && (
											<Text
												text={`d-${
													zoneIndex + 1
												} l-${++lineIndex}`}
												fontSize={labelFontSize / scale}
												x={
													configuration[zone].s[line]
														.pl[0][0] +
													(configuration[zone].s[line]
														.pl[1][0] -
														configuration[zone].s[
															line
														].pl[0][0]) *
														0.5
												}
												y={
													configuration[zone].s[line]
														.pl[0][1] +
													(configuration[zone].s[line]
														.pl[1][1] -
														configuration[zone].s[
															line
														].pl[0][1]) *
														0.5 -
													20
												}
												fill={colors.lineColor}
											/>
										)}
									</Fragment>
								)
							)
						)}
						{Object.keys(configuration).map((zone, zoneIndex) =>
							Object.keys(configuration[zone].s).map(
								(line, lineIndex) =>
									Object.keys(
										configuration[zone].s[line].s
									).map((counter, counterIndex) => (
										<Fragment key={counterIndex}>
											<Line
												points={configuration[zone].s[
													line
												].s[counter].pl.flat()}
												closed
												stroke={colors.conterColor}
											/>

											{configuration[zone].s[line].s[
												counter
											].pl.map((point, index) => (
												<Circle
													key={index}
													x={point[0]}
													y={point[1]}
													fill={colors.pointColor}
													radius={pointSize / scale}
													draggable={tab === 'shot'}
													onDragEnd={e => {
														e.evt.stopPropagation()
														editCounter({
															x: e.target.x(),
															y: e.target.y(),
															zone,
															line,
															counter,
															index,
														})
													}}
													onContextMenu={e => {
														e.evt.preventDefault()
														e.evt.stopPropagation()
														if (tab !== 'shot')
															return
														deletePoint([
															point[0],
															point[1],
														])
													}}
												/>
											))}
											{configuration[zone].s[line].s[
												counter
											].pl.length >= 2 && (
												<Text
													text={`d-${
														zoneIndex + 1
													} l-${lineIndex + 1} s-${
														counterIndex + 1
													}`}
													fontSize={
														labelFontSize / scale
													}
													x={
														configuration[zone].s[
															line
														].s[counter].pl[0][0] +
														(configuration[zone].s[
															line
														].s[counter].pl[1][0] -
															configuration[zone]
																.s[line].s[
																counter
															].pl[0][0]) *
															0.5
													}
													y={
														configuration[zone].s[
															line
														].s[counter].pl[0][1] +
														(configuration[zone].s[
															line
														].s[counter].pl[1][1] -
															configuration[zone]
																.s[line].s[
																counter
															].pl[0][1]) *
															0.5 -
														20
													}
													fill={colors.conterColor}
												/>
											)}
										</Fragment>
									))
							)
						)}
					</Layer>
				</Stage>
			</div>
		</div>
	)
}

export default Video
