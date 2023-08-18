import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import Button from 'shared/ui/Button/Button'
import NumInput from 'shared/ui/NumInput/NumInput'
import { sendCameraConfig } from '../model/services/sendCameraConfig'
import { cameraActions } from '../model/slices/cameraSlice'
import cls from './SendCameraConfig.module.scss'
import { classNames } from 'shared/lib/classNames'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import Checkbox from 'shared/ui/Checkbox/Checkbox'

export const SendCameraConfig = () => {
	const { cameraConfig, status } = useTypedSelector(state => state.camera)

	const dispatch = useAppDispatch()

	const sendCameraConfigHandler = () => {
		dispatch(sendCameraConfig())
	}

	return (
		<div className={classNames(cls.config, {}, [cls.cameraConfig])}>
			<div className={cls.configBody}>
				<Checkbox
					label='Инфракрасный фильтр'
					checked={cameraConfig.filter}
					onChange={checked =>
						dispatch(cameraActions.setFilter(checked))
					}
				/>
				<div></div>
				<NumInput
					label='Параметры зума'
					value={cameraConfig.zoom}
					increment={100}
					bigIncrement={1000}
					max={20000}
					min={0}
					onChange={value => dispatch(cameraActions.setZoom(value))}
				/>

				<NumInput
					label='Параметры сервопривода Х (°)'
					value={cameraConfig.servoX}
					increment={1}
					bigIncrement={5}
					max={95}
					min={85}
					onChange={value => dispatch(cameraActions.setServoX(value))}
				/>

				<NumInput
					label='Параметры фокуса'
					value={cameraConfig.focus}
					increment={100}
					bigIncrement={1000}
					max={20000}
					min={0}
					onChange={value => dispatch(cameraActions.setFocus(value))}
				/>

				<NumInput
					label='Параметры сервопривода Y(°)'
					value={cameraConfig.servoY}
					increment={1}
					bigIncrement={5}
					max={95}
					min={85}
					onChange={value => dispatch(cameraActions.setServoY(value))}
				/>
			</div>
			<Button
				disabled={status !== 'init'}
				onClick={sendCameraConfigHandler}
				size='l'
			>
				{status === 'init' && 'Сохранить'}
				{status === 'error' && 'Ошибка'}
				{status === 'loading' && 'Загрузка...'}
				{status === 'success' && 'Отправлено!'}
			</Button>
		</div>
	)
}
