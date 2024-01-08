import { useEffect, useRef } from 'react'
import { videoActions } from '../model/slices/videoSlice'
import Loader from 'shared/ui/Loader/Loader'
import { classNames } from 'shared/lib/classNames'
import cls from './Video.module.scss'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import ReactHlsPlayer from '@gumlet/react-hls-player'
import { Text } from 'shared/ui/Text/Text'

interface VideoProps {
	className?: string
}

const isDev = process.env.NODE_ENV === 'development'
const devSrc = '10.0.0.94'

export const Video = (props: VideoProps) => {
	const { className } = props
	const videoRef = useRef<HTMLVideoElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const { tab } = useTypedSelector(state => state.tabs)
	const { status, quality } = useTypedSelector(state => state.video)

	const dispatch = useAppDispatch()

	useEffect(() => {
		const video = videoRef.current
		const container = containerRef.current

		video?.addEventListener('loadstart', () => {
			dispatch(videoActions.setStatus('loading'))

			dispatch(
				videoActions.setVideoSize({
					width: container?.offsetWidth,
					height: container?.offsetHeight,
				})
			)
		})
		video?.addEventListener('canplay', () => {
			dispatch(videoActions.setStatus('success'))

			dispatch(
				videoActions.setVideoSize({
					width: container?.offsetWidth,
					height: container?.offsetHeight,
				})
			)
		})

		window.addEventListener('resize', () => {
			dispatch(
				videoActions.setVideoSize({
					width: container?.offsetWidth,
					height: container?.offsetHeight,
				})
			)
		})

		return () => {
			video?.removeEventListener('canplay', () => {})
			video?.removeEventListener('loadstart', () => {})
			window.removeEventListener('resize', () => {})
		}
	}, [dispatch])

	useEffect(() => {
		const video = videoRef.current
		if (tab === 'shot') {
			video?.pause()
		}
		if (tab !== 'shot' && video?.paused) {
			video.currentTime = 0
			video.play()
		}
	}, [tab, dispatch, quality])

	return (
		<div
			ref={containerRef}
			className={classNames(cls.Video, {}, [className])}
		>
			{status === 'loading' && <Loader className={cls.loader} />}
			{status === 'error' && (
				<Text text='Ошибка загрузки видео' className={cls.error} />
			)}
			<ReactHlsPlayer
				className={cls.player}
				playerRef={videoRef}
				src={`http://${
					isDev ? devSrc : window.location.host
				}/hls/${quality}/index.m3u8`}
				autoPlay
				muted
				controls={false}
				width='100%'
				height='100%'
			/>
		</div>
	)
}
