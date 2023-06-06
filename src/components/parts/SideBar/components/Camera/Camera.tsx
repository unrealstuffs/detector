import { useActions } from '../../../../../hooks/useActions'
import { useTypedSelector } from '../../../../../hooks/useTypedSelector'
import NumInput from '../../../../ui/NumInput/NumInput'

import styles from './Camera.module.scss'
import Button from '../../../../ui/Button/Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../../store'
import { sendCameraConfig } from '../../../../../store/slices/cameraSlice'

const Camera = () => {
	const { cameraConfig, status } = useTypedSelector(state => state.camera)
	const { setCameraConfig, setCameraConfigStatus } = useActions()
	const dispatch = useDispatch<AppDispatch>()

	const sendCameraConfigHandler = async () => {
		await dispatch(sendCameraConfig(''))

		setTimeout(() => {
			setCameraConfigStatus('init')
		}, 1000)
	}

	return (
		<div className={`${styles.config} ${styles.cameraConfig}`}>
			<div className={`${styles.configBody}`}>
				<div className={`${styles.checkboxGroup}`}>
					<label>Инфракрасный фильтр</label>
					<input
						type='checkbox'
						checked={cameraConfig.filter}
						onChange={e => {
							setCameraConfig({
								...cameraConfig,
								filter: e.target.checked,
							})
						}}
					/>
				</div>
				<div></div>
				<div className={`${styles.numGroup}`}>
					<label>Параметры зума</label>
					<NumInput
						value={cameraConfig.zoom}
						increment={100}
						bigIncrement={1000}
						max={20000}
						min={0}
						changeValue={value =>
							setCameraConfig({
								...cameraConfig,
								zoom: +value,
							})
						}
					/>
				</div>

				<div className={`${styles.numGroup}`}>
					<label>Параметры сервопривода Х (°)</label>
					<NumInput
						value={cameraConfig.servoX}
						increment={1}
						bigIncrement={5}
						max={95}
						min={85}
						changeValue={value =>
							setCameraConfig({
								...cameraConfig,
								servoX: +value,
							})
						}
					/>
				</div>

				<div className={`${styles.numGroup}`}>
					<label>Параметры фокуса</label>
					<NumInput
						value={cameraConfig.focus}
						increment={100}
						bigIncrement={1000}
						max={20000}
						min={0}
						changeValue={value =>
							setCameraConfig({
								...cameraConfig,
								focus: +value,
							})
						}
					/>
				</div>

				<div className={`${styles.numGroup}`}>
					<label>Параметры сервопривода Y(°)</label>
					<NumInput
						value={cameraConfig.servoY}
						increment={1}
						bigIncrement={5}
						max={95}
						min={85}
						changeValue={value =>
							setCameraConfig({
								...cameraConfig,
								servoY: +value,
							})
						}
					/>
				</div>
			</div>
			<div className={`${styles.configActions}`}>
				<Button
					disabled={status !== 'init'}
					onClick={sendCameraConfigHandler}
					type='primary'
					size='big'
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

export default Camera
