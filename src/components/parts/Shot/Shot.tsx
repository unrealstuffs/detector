import { useEffect, useRef, useState, FC } from 'react'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Message from '../../ui/Message/Message'
import styles from './Shot.module.scss'
import { drawImage, drawPolygons, handleStepBack, setPoint } from './utils'

const Shot: FC<{ isShot: boolean }> = ({ isShot }) => {
	// refs
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const contextRef = useRef<CanvasRenderingContext2D | null>(null)
	const videoRef = useRef<HTMLVideoElement | null>(null)

	//fetch state
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)

	const [videoLoading, setVideoLoading] = useState(true)

	//redux
	const { accessToken } = useTypedSelector(state => state.user)
	const { configuration, mode, detectorName } = useTypedSelector(
		state => state.detector
	)
	const { setConfiguration, removeConfiguration } = useActions()

	const [ratio, setRatio] = useState<number>(1)

	const resetImage = () => {
		drawImage(contextRef.current, canvasRef.current)
		removeConfiguration()
	}

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
				setLoading(false)
				setSuccess(true)
				setTimeout(() => setSuccess(false), 5000)
			} else {
				setLoading(false)
				setError(true)
				setTimeout(() => setError(false), 5000)
			}
		} catch (err) {
			console.log(err)
			setLoading(false)
			setError(true)
			setTimeout(() => setError(false), 5000)
		}
	}

	useEffect(() => {
		contextRef.current?.scale(ratio, ratio)
	}, [ratio])

	useEffect(() => {
		if (videoRef.current?.videoWidth && canvasRef.current) {
			canvasRef.current.width = videoRef.current!.videoWidth
			canvasRef.current.height = videoRef.current!.videoHeight
			contextRef.current = canvasRef.current.getContext('2d')
			setRatio(
				videoRef.current!.videoWidth / videoRef.current!.offsetWidth
			)
			drawImage(contextRef.current, canvasRef.current)
		}
	}, [videoRef.current?.videoWidth, contextRef.current, canvasRef.current])

	useEffect(() => {
		if (configuration && contextRef.current) {
			drawImage(contextRef.current, canvasRef.current)
			drawPolygons(configuration, contextRef.current)
		}
	}, [configuration, contextRef.current])

	useEffect(() => {
		if (isShot) {
			videoRef.current?.pause()
		} else {
			setVideoLoading(true)
			videoRef.current?.load()
			videoRef.current?.play()
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
							onClick={resetImage}
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
					ref={videoRef}
					onLoadedData={() => setVideoLoading(false)}
				>
					<source
						// src='/assets/videoplayback.mp4'
						src={`http://${
							window.location.host
						}/pipeline-stream?reset=${Math.round(
							Math.random() * 1000
						)}`}
						// src={`http://212.192.41.6:20407/pipeline-stream?reset=${Math.round(
						// 	Math.random() * 1000
						// )}`}
						type='video/ogg'
					/>
				</video>
				<canvas
					ref={canvasRef}
					onClick={e =>
						isShot &&
						setPoint(
							e,
							configuration,
							canvasRef.current?.getBoundingClientRect(),
							mode,
							setConfiguration,
							ratio
						)
					}
				></canvas>
			</div>
		</div>
	)
}

export default Shot
