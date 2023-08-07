import { useEffect, useRef, useState } from 'react'
import { videoActions } from '../model/slices/videoSlice'
import Loader from 'shared/ui/Loader/Loader'
import { classNames } from 'shared/lib/classNames'
import cls from './Video.module.scss'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'

interface VideoProps {
	src: string
	className?: string
}

export const Video = (props: VideoProps) => {
	const { src, className } = props
	const videoRef = useRef<HTMLVideoElement>(null)
	const [videoLoading, setVideoLoading] = useState(true)
	const { tab } = useTypedSelector(state => state.tabs)

	useEffect(() => {
		const video = videoRef.current

		video?.addEventListener('loadedmetadata', () => {
			setVideoLoading(false)
			videoActions.setVideoSize({
				width: video.videoWidth,
				height: video.videoHeight,
			})
			videoActions.setScale(video?.offsetWidth / video?.videoWidth)
		})

		return () => {
			video?.removeEventListener('loadedmetadata', () => {})
		}
	}, [])
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
		<div className={classNames(cls.Video, {}, [className])}>
			{videoLoading && <Loader className={cls.loader} />}

			<video ref={videoRef} src={src} autoPlay width='100%' loop muted />
		</div>
	)
}
