import { useEffect, useRef } from 'react'
import { videoActions } from '../model/slices/videoSlice'
import Loader from 'shared/ui/Loader/Loader'
import { classNames } from 'shared/lib/classNames'
import cls from './Video.module.scss'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

interface VideoProps {
	src: string
	className?: string
}

export const Video = (props: VideoProps) => {
	const { src, className } = props
	const videoRef = useRef<HTMLVideoElement>(null)
	const { tab } = useTypedSelector(state => state.tabs)
	const { status } = useTypedSelector(state => state.video)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const video = videoRef.current

		video?.addEventListener('loadedmetadata', () => {
			dispatch(videoActions.setStatus('success'))
			dispatch(
				videoActions.setVideoSize({
					width: video.videoWidth,
					height: video.videoHeight,
				})
			)
			dispatch(videoActions.setScale(video?.offsetWidth / video?.videoWidth))
		})

		return () => {
			video?.removeEventListener('loadedmetadata', () => {})
		}
	}, [dispatch])

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		window.addEventListener('resize', () => {
			dispatch(videoActions.setScale(video?.offsetWidth / video?.videoWidth))
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
			dispatch(videoActions.setStatus('loading'))
			video.load()
			video.play()
		}
	}, [tab, dispatch])

	return (
		<div className={classNames(cls.Video, {}, [className])}>
			{status === 'loading' && <Loader className={cls.loader} />}

			<video ref={videoRef} src={src} autoPlay width='100%' loop muted />
		</div>
	)
}
