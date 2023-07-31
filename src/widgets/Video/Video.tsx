import React, { useRef, useState, useEffect, Fragment } from 'react'
import pointInPolygon from 'point-in-polygon'
import { Stage, Layer, Line, Circle, Text } from 'react-konva'

import styles from './Video.module.scss'
import { getMiddleOfPolygon, handleDragMove } from './utils/utils'
import { useTypedSelector } from '../../shared/hooks/useTypedSelector'
import { useActions } from '../../shared/hooks/useActions'

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
const lineWidth = 2

const Video: React.FC<VideoProps> = ({ videoSrc }) => {
	const { configuration, selectedPolygon, videoSize } = useTypedSelector(
		state => state.configuration
	)
	const { tab } = useTypedSelector(state => state.tabs)
	const { detectorName } = useTypedSelector(state => state.detector)
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

	const getParentPolygon = () => {
		if (selectedPolygon.length === 3) {
			return configuration[selectedPolygon[0]].pl
		}
		if (selectedPolygon.length === 5) {
			return configuration[selectedPolygon[0]].s[selectedPolygon[2]].pl
		}
		return []
	}

	return (
		<div className={styles.video}>
			<h1 className={styles.title}>Детектор ID {detectorName}</h1>
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
						if (e.evt.button === 2) return
						if (!selectedPolygon.length) return
						if (tab !== 'shot') return

						const pos = e.target.getStage()?.getPointerPosition()
						if (!pos) return

						if (
							selectedPolygon.length === 1 ||
							pointInPolygon(
								[pos?.x / scale, pos?.y / scale],
								getParentPolygon()
							)
						)
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
						{Object.keys(configuration).map((zone, zoneIndex) => {
							const zonePolygon = configuration[zone].pl

							const { centerX, centerY } =
								getMiddleOfPolygon(zonePolygon)
							return (
								<Fragment key={zoneIndex}>
									<Line
										points={configuration[zone].pl.flat()}
										closed
										stroke={colors.zoneColor}
										strokeWidth={lineWidth / scale}
									/>

									{zonePolygon.map(
										(point: number[], index: number) => (
											<Circle
												key={index}
												x={point[0]}
												y={point[1]}
												fill={colors.pointColor}
												radius={pointSize / scale}
												draggable={tab === 'shot'}
												onDragMove={e => {
													const pos =
														e.target.getAbsolutePosition()
													const box =
														e.target.getStage()
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
													e.target.setAbsolutePosition(
														newPos
													)

													editZone({
														x: e.target.x(),
														y: e.target.y(),
														zone,
														index,
													})
												}}
												onContextMenu={e => {
													if (tab !== 'shot') return
													deletePoint([
														point[0],
														point[1],
													])
												}}
											/>
										)
									)}
									{zonePolygon.length >= 2 && (
										<Text
											text={`d-${zoneIndex + 1} ${
												configuration[zone]
													.reverseDirection
													? '(Обратное)'
													: ''
											}`}
											fontSize={labelFontSize / scale}
											x={centerX - labelFontSize / scale}
											y={centerY - labelFontSize / scale}
											fill={colors.zoneColor}
										/>
									)}
								</Fragment>
							)
						})}
						{Object.keys(configuration).map((zone, zoneIndex) =>
							Object.keys(configuration[zone].s).map(
								(line, lineIndex) => {
									const linePolygon =
										configuration[zone].s[line].pl

									const { centerX, centerY } =
										getMiddleOfPolygon(linePolygon)

									return (
										<Fragment key={lineIndex}>
											<Line
												points={linePolygon.flat()}
												closed
												stroke={colors.lineColor}
												strokeWidth={lineWidth / scale}
											/>

											{linePolygon.map(
												(
													point: number[],
													index: number
												) => (
													<Circle
														key={index}
														x={point[0]}
														y={point[1]}
														fill={colors.pointColor}
														radius={
															pointSize / scale
														}
														draggable={
															tab === 'shot'
														}
														onDragMove={e => {
															handleDragMove(
																e,
																configuration[
																	zone
																].pl
															)
															editLine({
																x: e.target.x(),
																y: e.target.y(),
																zone,
																line,
																index,
															})
														}}
														onContextMenu={e => {
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
											{linePolygon.length >= 2 && (
												<Text
													text={`d-${
														zoneIndex + 1
													} l-${++lineIndex}`}
													fontSize={
														labelFontSize / scale
													}
													x={
														centerX -
														labelFontSize / scale
													}
													y={
														centerY -
														labelFontSize / scale
													}
													fill={colors.lineColor}
												/>
											)}
										</Fragment>
									)
								}
							)
						)}
						{Object.keys(configuration).map((zone, zoneIndex) =>
							Object.keys(configuration[zone].s).map(
								(line, lineIndex) =>
									Object.keys(
										configuration[zone].s[line].s
									).map((counter, counterIndex) => {
										const counterPolygon =
											configuration[zone].s[line].s[
												counter
											].pl

										const { centerX, centerY } =
											getMiddleOfPolygon(counterPolygon)

										return (
											<Fragment key={counterIndex}>
												<Line
													points={configuration[
														zone
													].s[line].s[
														counter
													].pl.flat()}
													closed
													stroke={colors.conterColor}
													strokeWidth={
														lineWidth / scale
													}
												/>

												{counterPolygon.map(
													(
														point: number[],
														index: number
													) => (
														<Circle
															key={index}
															x={point[0]}
															y={point[1]}
															fill={
																colors.pointColor
															}
															radius={
																pointSize /
																scale
															}
															draggable={
																tab === 'shot'
															}
															onDragMove={e => {
																handleDragMove(
																	e,
																	configuration[
																		zone
																	].s[line].pl
																)
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
																if (
																	tab !==
																	'shot'
																)
																	return
																deletePoint([
																	point[0],
																	point[1],
																])
															}}
														/>
													)
												)}
												{counterPolygon.length >= 2 && (
													<Text
														align='center'
														verticalAlign='center'
														text={`d-${
															zoneIndex + 1
														} l-${
															lineIndex + 1
														} s-${
															counterIndex + 1
														}`}
														fontSize={
															labelFontSize /
															scale
														}
														x={
															centerX -
															labelFontSize /
																scale
														}
														y={
															centerY -
															labelFontSize /
																scale
														}
														fill={
															colors.conterColor
														}
													/>
												)}
											</Fragment>
										)
									})
							)
						)}
					</Layer>
				</Stage>
			</div>
		</div>
	)
}

export default Video
