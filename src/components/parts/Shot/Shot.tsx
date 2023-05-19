import { useEffect, useRef, useState, FC } from 'react'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Message from '../../ui/Message/Message'
import styles from './Shot.module.scss'
import { drawImage, drawPolygons, handleStepBack, setPoint } from './utils'

interface ShotProps {
	isShot: boolean
}

const Shot: FC<ShotProps> = ({ isShot }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const videoRef = useRef<HTMLVideoElement | null>(null)
	const clearLayout = useRef<HTMLButtonElement | null>(null)

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)
	const [videoLoading, setVideoLoading] = useState(true)

	const { accessToken } = useTypedSelector(state => state.user)
	const { configuration, mode, detectorName } = useTypedSelector(
		state => state.detector
	)
	const { setConfiguration, removeConfiguration } = useActions()

	const sendData = async () => {
		const data = {
			base_size: [
				videoRef.current?.videoWidth,
				videoRef.current?.videoHeight,
			],
			zone: {
				r_00: {
					pl: [
						[0, 0],
						[videoRef.current?.videoWidth, 0],
						[
							videoRef.current?.videoWidth,
							videoRef.current?.videoHeight,
						],
						[0, videoRef.current?.videoHeight],
					],
					s: {
						...configuration,
					},
				},
			},
		}

		try {
			setLoading(true)
			const response = await fetch(
				`${process.env.REACT_APP_EDIT_ZONE_URL}`,
				{
					method: 'PUT',
					body: JSON.stringify(data),
					headers: {
						Authorization: `${accessToken}`,
					},
				}
			)
			const resData = await response.json()

			if (resData.result === 'success') {
				setSuccess(true)
				setTimeout(() => setSuccess(false), 5000)
			} else {
				setError(true)
				setTimeout(() => setError(false), 5000)
			}
		} catch (err) {
			console.log(err)
			setError(true)
			setTimeout(() => setError(false), 5000)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const video = videoRef.current
		const canvas = canvasRef.current
		const clear = clearLayout.current
		const context = canvas?.getContext('2d')
		const bounding = canvas?.getBoundingClientRect()
		let ratio = 1

		const drawOverlay = () => {
			if (!video || !canvas || !context || !bounding) return

			const { videoWidth, videoHeight } = video
			canvas.width = videoWidth
			canvas.height = videoHeight
			ratio = videoWidth / video.offsetWidth
			context.scale(ratio, ratio)
		}

		const handleCanvasClick = (event: MouseEvent) => {
			if (!canvas) return
			if (
				setPoint(
					event,
					configuration,
					bounding,
					mode,
					setConfiguration,
					ratio
				) === undefined
			) {
				drawOverlay()
			}
		}

		if (configuration) {
			drawImage(context, canvas)
			drawPolygons(configuration, context)
		}

		const resetImage = () => {
			drawImage(context, canvas)
			removeConfiguration()
		}

		video?.addEventListener('loadedmetadata', () => {
			drawOverlay()
			setVideoLoading(false)
		})
		clear?.addEventListener('click', resetImage)
		canvas?.addEventListener('click', handleCanvasClick)

		return () => {
			video?.removeEventListener('loadedmetadata', drawOverlay)
			clear?.removeEventListener('click', resetImage)
			canvas?.removeEventListener('click', handleCanvasClick)
		}
	}, [configuration, setConfiguration, mode, removeConfiguration])

	useEffect(() => {
		if (isShot) {
			videoRef.current?.pause()
		} else {
			setVideoLoading(true)
			videoRef.current?.load()
			videoRef.current?.play()
			videoRef.current!.muted = true
		}
	}, [isShot])

	return (
		<div className={styles.shot}>
			<div className={styles.title}>
				<h1>Детектор {detectorName}</h1>
				<Message loading={loading} success={success} error={error} />
				{isShot && (
					<div className={styles.buttons}>
						<button
							onClick={() =>
								handleStepBack(
									configuration,
									setConfiguration,
									mode
								)
							}
							className={styles.clearButton}
						>
							Шаг назад
						</button>
						<button
							ref={clearLayout}
							className={styles.clearButton}
						>
							Стереть
						</button>
						<button
							onClick={sendData}
							className={styles.submitButton}
						>
							Отправить
						</button>
					</div>
				)}
			</div>

			<div className={styles.canvas}>
				{videoLoading && (
					<img
						className={styles.loader}
						src='/assets/loader.gif'
						alt='Loading...'
						width={60}
					/>
				)}
				<video
					className='video'
					autoPlay
					width='100%'
					loop
					muted
					ref={videoRef}
					// onLoadedData={() => setVideoLoading(false)}
				>
					<source
						src='/assets/videoplayback.mp4'
						// src={`http://${
						// 	window.location.host
						// }/pipeline-stream?reset=${Math.round(
						// 	Math.random() * 1000
						// )}`}
						// src={`http://212.192.41.6:20407/pipeline-stream?reset=${Math.round(
						// 	Math.random() * 1000
						// )}`}
						type='video/ogg'
					/>
				</video>
				<canvas ref={canvasRef}></canvas>
			</div>
		</div>
	)
}

export default Shot
