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
import Button from 'shared/ui/Button/Button'
import Checkbox from 'shared/ui/Checkbox/Checkbox'

interface VideoMarkupProps {
	className?: string
}

export const VideoMarkup = (props: VideoMarkupProps) => {
	const { className } = props

	const { detectorName } = useTypedSelector(state => state.detectorName)
	const { videoQuality } = useTypedSelector(state => state.appConfig)
	const { status, autoStop } = useTypedSelector(state => state.video)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!videoQuality) {
			dispatch(videoActions.setQuality('mq'))
		} else {
			dispatch(videoActions.setQuality('lq'))
		}
	}, [dispatch, videoQuality])

	useEffect(() => {
		if (!autoStop) return
		const timer = setTimeout(() => {
			dispatch(videoActions.setStatus('nodata'))
		}, 1000 * 30)

		return () => {
			clearTimeout(timer)
		}
	}, [dispatch, autoStop, status])

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>
		document.addEventListener('visibilitychange', () => {
			if (!document.hidden) return
			timer = setTimeout(() => {
				dispatch(videoActions.setStatus('nodata'))
			}, 1000 * 30)
		})

		return () => {
			clearTimeout(timer)
			document.removeEventListener('visibilitychange', () => {})
		}
	}, [dispatch])

	const reloadVideo = () => {
		dispatch(videoActions.setStatus('loading'))
	}

	const changeAutoStop = () => {
		dispatch(videoActions.setAutoStop(!autoStop))
	}

	return (
		<div className={classNames(cls.VideoMarkup, {}, [className])}>
			<HStack align='center' justify='between' className={cls.heading}>
				<HStack align='end' gap='8'>
					<Text title={`Детектор ID ${detectorName}`} size='l' bold />
					<Text className={cls.version} size='m' text={`v ${process.env.REACT_APP_VERSION}`} />
				</HStack>
				<HStack gap='16'>
					<Checkbox label='Автоматическая пауза' reverse checked={autoStop} onChange={changeAutoStop} />
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
			</HStack>
			<div className={cls.videoContainer}>
				{status === 'nodata' && (
					<Button className={cls.nodata} size='l' onClick={reloadVideo}>
						Загрузить
					</Button>
				)}
				<Video />
				<EditMarkup muted={status === 'nodata'} />
			</div>
		</div>
	)
}
