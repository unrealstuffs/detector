import { classNames } from 'shared/lib/classNames'
import cls from './VideoMarkup.module.scss'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { Text } from 'shared/ui/Text/Text'
import { Video, videoActions } from 'entities/Video'
import { EditMarkup } from 'features/EditMarkup'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import AppSelect from 'shared/ui/AppSelect/AppSelect'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useEffect } from 'react'

interface VideoMarkupProps {
	className?: string
}

export const VideoMarkup = (props: VideoMarkupProps) => {
	const { className } = props

	const { detectorName } = useTypedSelector(state => state.detectorName)
	const { videoQuality } = useTypedSelector(state => state.appConfig)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!videoQuality) {
			dispatch(videoActions.setQuality('mq'))
		} else {
			dispatch(videoActions.setQuality('lq'))
		}
	}, [dispatch, videoQuality])

	return (
		<div className={classNames(cls.VideoMarkup, {}, [className])}>
			<HStack align='center' justify='between' className={cls.heading}>
				<Text title={`Детектор ID ${detectorName}`} size='l' bold />
				{videoQuality && (
					<AppSelect
						options={[
							{ value: 'lq', label: 'Низкое качество' },
							{ value: 'mq', label: 'Среднее качество' },
						]}
						defaultValue={{ value: 'lq', label: 'Низкое качество' }}
						onChange={quality => {
							if (!quality) return
							if (quality.value !== 'lq' && quality.value !== 'mq') return
							dispatch(videoActions.setQuality(quality.value))
						}}
					/>
				)}
			</HStack>
			<div className={cls.videoContainer}>
				<Video />
				<EditMarkup />
			</div>
		</div>
	)
}
