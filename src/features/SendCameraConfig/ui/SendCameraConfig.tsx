import { AppDispatch } from 'app/store'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import Button from 'shared/ui/Button/Button'
import NumInput from 'shared/ui/NumInput/NumInput'
import { sendCameraConfig } from '../model/services/sendCameraConfig'
import { cameraActions } from '../model/slices/cameraSlice'
import cls from './SendCameraConfig.module.scss'
import { classNames } from 'shared/lib/classNames'

export const SendCameraConfig = () => {
	const { cameraConfig, status } = useTypedSelector(state => state.camera)

	const dispatch = useDispatch<AppDispatch>()

	const sendCameraConfigHandler = async () => {
		await dispatch(sendCameraConfig())
	}

	return (
		<div className={classNames(cls.config, {}, [cls.cameraConfig])}>
			<div className={cls.configBody}>
				<div className={cls.checkboxGroup}>
					<label>Инфракрасный фильтр</label>
					<input
						type='checkbox'
						checked={cameraConfig.filter}
						onChange={e => {
							cameraActions.setCameraConfig({
								...cameraConfig,
								filter: e.target.checked,
							})
						}}
					/>
				</div>
				<div></div>
				<div className={cls.numGroup}>
					<NumInput
						label='Параметры зума'
						value={cameraConfig.zoom}
						increment={100}
						bigIncrement={1000}
						max={20000}
						min={0}
						onChange={value =>
							cameraActions.setCameraConfig({
								...cameraConfig,
								zoom: value,
							})
						}
					/>
				</div>

				<div className={cls.numGroup}>
					<NumInput
						label='Параметры сервопривода Х (°)'
						value={cameraConfig.servoX}
						increment={1}
						bigIncrement={5}
						max={95}
						min={85}
						onChange={value =>
							cameraActions.setCameraConfig({
								...cameraConfig,
								servoX: value,
							})
						}
					/>
				</div>

				<div className={cls.numGroup}>
					<NumInput
						label='Параметры фокуса'
						value={cameraConfig.focus}
						increment={100}
						bigIncrement={1000}
						max={20000}
						min={0}
						onChange={value =>
							cameraActions.setCameraConfig({
								...cameraConfig,
								focus: value,
							})
						}
					/>
				</div>

				<div className={cls.numGroup}>
					<NumInput
						label='Параметры сервопривода Y(°)'
						value={cameraConfig.servoY}
						increment={1}
						bigIncrement={5}
						max={95}
						min={85}
						onChange={value =>
							cameraActions.setCameraConfig({
								...cameraConfig,
								servoY: value,
							})
						}
					/>
				</div>
			</div>
			<div className={cls.configActions}>
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
		</div>
	)
}
