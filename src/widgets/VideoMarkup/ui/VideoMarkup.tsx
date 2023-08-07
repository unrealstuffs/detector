import { classNames } from 'shared/lib/classNames'
import cls from './VideoMarkup.module.scss'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { Text } from 'shared/ui/Text/Text'
import { EditMarkup } from 'features/EditMarkup'
import { Video } from 'entities/Video'

interface VideoMarkupProps {
	className?: string
}

export const VideoMarkup = (props: VideoMarkupProps) => {
	const { className } = props

	const { detectorName } = useTypedSelector(state => state.detectorName)
	const isDev = process.env.NODE_ENV === 'development'
	const devSrc = '/assets/videoplayback.mp4'
	const randomGetParameter = Math.round(Math.random() * 1000)
	const prodSrc = `http://${window.location.host}/pipeline-stream?reset=${randomGetParameter}`

	return (
		<div className={classNames(cls.VideoMarkup, {}, [className])}>
			<Text
				title={`Детектор ID ${detectorName}`}
				size='l'
				bold
				className={cls.heading}
			/>
			<div className={cls.videoContainer}>
				<Video src={isDev ? devSrc : prodSrc} />
				<EditMarkup />
			</div>
		</div>
	)
}
