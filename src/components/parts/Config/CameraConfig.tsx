import { useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Message from '../../ui/Message/Message'
import NumInput from '../../ui/NumInput/NumInput'

import styles from './styles.module.scss'

const CameraConfig = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const { cameraConfig } = useTypedSelector(state => state.camera)
	const { setCameraConfig } = useActions()

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)

	const sendCameraConfig = async () => {
		try {
			setLoading(true)
			const [zoom, focus, servoX, servoY, filter] = await Promise.all([
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({ ZOOM: cameraConfig.zoom }),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({ FOCUS: cameraConfig.focus }),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({ SERVO_X: cameraConfig.servoX }),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({ SERVO_Y: cameraConfig.servoY }),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
				fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
					method: 'PUT',
					body: JSON.stringify({
						IR_CUT: cameraConfig.filter === true ? 'on' : 'off',
					}),
					headers: {
						Authorization: `${accessToken}`,
					},
				}),
			])
			const data = await zoom.json()
			if (data.result === 'success') {
				setTimeout(() => {
					setLoading(false)
					setSuccess(true)
					setTimeout(() => setSuccess(false), 4000)
				}, 60000)
			} else {
				setTimeout(() => {
					setLoading(false)
					setError(true)
					setTimeout(() => setError(false), 4000)
				}, 60000)
			}
		} catch (err) {
			setTimeout(() => {
				setLoading(false)
				setError(true)
				setTimeout(() => setError(false), 4000)
			}, 60000)
		}
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
				<button
					disabled={loading}
					className='submit'
					onClick={sendCameraConfig}
				>
					Сохранить
				</button>
				<Message loading={loading} success={success} error={error} />
			</div>
		</div>
	)
}

export default CameraConfig
