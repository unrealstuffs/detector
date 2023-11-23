import { toast } from 'react-hot-toast'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import Button from 'shared/ui/Button/Button'
import { sendCameraConfig } from '../model/services/sendCameraConfig'
import { cameraActions } from '../model/slices/cameraSlice'
import cls from './SendCameraConfig.module.scss'
import { classNames } from 'shared/lib/classNames'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import Checkbox from 'shared/ui/Checkbox/Checkbox'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { VStack } from 'shared/ui/Stack/VStack/VStack'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import { Text } from 'shared/ui/Text/Text'
import { sendRestartCamera } from '../model/services/sendRestartCamera'

export const SendCameraConfig = () => {
	const { cameraConfig, status } = useTypedSelector(state => state.camera)

	const dispatch = useAppDispatch()

	const sendCameraConfigHandler = async () => {
		const result = await dispatch(sendCameraConfig())
		if (sendCameraConfig.fulfilled.match(result)) {
			toast.success('Отправлено!')
		} else {
			if (result.payload) {
				toast.error(`Ошибка отправки данных: ${result.payload}`)
			}
		}
	}

	const sendRestartCameraHandler = async () => {
		const result = await dispatch(sendRestartCamera())
		if (sendRestartCamera.fulfilled.match(result)) {
			toast.success('Отправлено!')
		} else {
			if (result.payload) {
				toast.error(`Ошибка отправки данных: ${result.payload}`)
			}
		}
	}

	return (
		<div className={classNames(cls.config, {}, [cls.cameraConfig])}>
			<VStack gap='32' className={cls.configBody}>
				<Checkbox
					label='Инфракрасный фильтр'
					checked={cameraConfig.filter}
					onChange={checked => dispatch(cameraActions.setFilter(checked))}
				/>
				<VStack gap='8'>
					<Text text='Параметры зума' bold size='s'></Text>
					<HStack gap='8'>
						<AiOutlineLeft
							onClick={() => {
								if (cameraConfig.zoom === 'STEP_M') {
									dispatch(cameraActions.setZoom(null))
								} else {
									dispatch(cameraActions.setZoom('STEP_M'))
								}
							}}
							className={classNames(cls.icon, { [cls.active]: cameraConfig.zoom === 'STEP_M' }, [])}
						/>
						<AiOutlineRight
							onClick={() => {
								if (cameraConfig.zoom === 'STEP_P') {
									dispatch(cameraActions.setZoom(null))
								} else {
									dispatch(cameraActions.setZoom('STEP_P'))
								}
							}}
							className={classNames(cls.icon, { [cls.active]: cameraConfig.zoom === 'STEP_P' }, [])}
						/>
					</HStack>
				</VStack>

				<VStack gap='8'>
					<Text text='Параметры фокуса' bold size='s'></Text>
					<HStack gap='8'>
						<AiOutlineLeft
							onClick={() => {
								if (cameraConfig.focus === 'STEP_M') {
									dispatch(cameraActions.setFocus(null))
								} else {
									dispatch(cameraActions.setFocus('STEP_M'))
								}
							}}
							className={classNames(cls.icon, { [cls.active]: cameraConfig.focus === 'STEP_M' }, [])}
						/>
						<AiOutlineRight
							onClick={() => {
								if (cameraConfig.focus === 'STEP_P') {
									dispatch(cameraActions.setFocus(null))
								} else {
									dispatch(cameraActions.setFocus('STEP_P'))
								}
							}}
							className={classNames(cls.icon, { [cls.active]: cameraConfig.focus === 'STEP_P' }, [])}
						/>
					</HStack>
				</VStack>
			</VStack>
			<HStack gap='12'>
				<Button disabled={status === 'loading'} onClick={sendCameraConfigHandler} size='m'>
					Сохранить
				</Button>
				<Button disabled={status === 'loading'} color='light' onClick={sendRestartCameraHandler} size='m'>
					Перезагрузить камеру
				</Button>
			</HStack>
		</div>
	)
}
