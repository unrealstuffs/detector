import { useEffect, useRef } from 'react'
import { videoActions } from '../model/slices/videoSlice'
import Loader from 'shared/ui/Loader/Loader'
import { classNames } from 'shared/lib/classNames'
import cls from './Video.module.scss'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import ReactHlsPlayer from 'react-hls-player'

interface VideoProps {
	className?: string
}

const isDev = process.env.NODE_ENV === 'development'
const devSrc = '10.0.0.94'
const randomGetParameter = Math.round(Math.random() * 1000)

export const Video = (props: VideoProps) => {
	const { className } = props
	const videoRef = useRef<HTMLVideoElement>(null)
	const { tab } = useTypedSelector(state => state.tabs)
	const { status, quality } = useTypedSelector(state => state.video)

	const dispatch = useAppDispatch()

	useEffect(() => {
		const video = videoRef.current

		video?.addEventListener('loadstart', () => {
			dispatch(videoActions.setStatus('loading'))
		})
		video?.addEventListener('loadedmetadata', () => {
			dispatch(videoActions.setStatus('success'))
			dispatch(
				videoActions.setVideoSize({
					width: video.offsetWidth,
					height: video.offsetHeight,
				})
			)
		})

		return () => {
			video?.removeEventListener('loadedmetadata', () => {})
			video?.removeEventListener('loadstart', () => {})
		}
	}, [dispatch])

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		window.addEventListener('resize', () => {
			dispatch(
				videoActions.setVideoSize({
					width: video.offsetWidth,
					height: video.offsetHeight,
				})
			)
		})

		return () => {
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
		<div className={classNames(cls.Video, {}, [className])}>
			{status === 'loading' && <Loader className={cls.loader} />}
			<ReactHlsPlayer
				className={cls.player}
				playerRef={videoRef}
				src={`http://${
					isDev ? devSrc : window.location.host
				}/hls/${quality}/index.m3u8?reset=${randomGetParameter}`}
				autoPlay
				muted
				controls={false}
				width='100%'
				height='100%'
			/>
		</div>
	)
}
