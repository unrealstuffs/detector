import { useEffect, useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Message from '../../ui/Message/Message'

import styles from './styles.module.scss'

const DetectorConfig = () => {
	const { configuration, detectorConfig } = useTypedSelector(
		state => state.detector
	)
	const { cameraConfig } = useTypedSelector(state => state.camera)
	const { accessToken } = useTypedSelector(state => state.user)
	const { setDetectorConfig } = useActions()
	const [zones, setZones] = useState<any>([])
	const [currentZone, setCurrectZone] = useState<string>('z-1')

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		const tempArr: any = []
		for (let k = 0; k < Object.keys(configuration).length; k++) {
			tempArr.push(`z-${k + 1}`)
			for (
				let i = 0;
				i < Object.keys(configuration['d_' + k]['s']).length;
				i++
			) {
				tempArr.push(`z-${k + 1} l-${i + 1}`)
			}
		}
		setZones([...tempArr])
	}, [configuration])

	const sendDetectorConfig = async () => {
		try {
			setLoading(true)
			const response = await fetch(
				`${process.env.REACT_APP_DRY_CONTACT_URL}`,
				{
					method: 'POST',
					body: JSON.stringify(detectorConfig),
					headers: {
						Authorization: `${accessToken}`,
					},
				}
			)
			const data = await response.json()

			if (data.result === 'success') {
				setLoading(false)
				setSuccess(true)
				setTimeout(() => setSuccess(false), 4000)
			} else {
				setLoading(false)
				setError(true)
				setTimeout(() => setError(false), 4000)
			}
		} catch (err) {
			setLoading(false)
			setError(true)
			setTimeout(() => setError(false), 4000)
		}
	}

	return (
		<div className={`${styles.config} ${styles.databaseConfig}`}>
			<div className={`${styles.configBody}`}>
				<div className={`${styles.checkboxGroup}`}>
					<label>Сухой контакт</label>
					<input
						type='checkbox'
						checked={cameraConfig.dryCont}
						disabled
						// onChange={() => {
						// 	setCameraConfig({
						// 		...cameraConfig,
						// 		dryCont: !cameraConfig.dryCont,
						// 	})
						// }}
					/>
				</div>
				{cameraConfig.dryCont && (
					<>
						<div
							className={`${styles.inputGroup}`}
							style={{ marginRight: '16px' }}
						>
							<label>Выбрать зону</label>
							<select
								name=''
								id=''
								placeholder='Условие'
								onChange={e => {
									setCurrectZone(e.target.value)
								}}
							>
								{zones.map((zone: any, index: number) => (
									<option value={zone}>{zone}</option>
								))}
							</select>
						</div>
						<div className={`${styles.inputGroup}`}>
							<label>Условие</label>
							<input
								type='number'
								placeholder=''
								value={
									detectorConfig[`${currentZone}`]
										? detectorConfig[`${currentZone}`]
										: ''
								}
								onChange={e => {
									setDetectorConfig({
										...detectorConfig,
										[`${currentZone}`]: +e.target.value,
									})
								}}
							/>
						</div>
					</>
				)}
			</div>
			{cameraConfig.dryCont && (
				<div className={`${styles.configActions}`}>
					<button className='submit' onClick={sendDetectorConfig}>
						Сохранить
					</button>
					<Message
						loading={loading}
						success={success}
						error={error}
					/>
				</div>
			)}
		</div>
	)
}

export default DetectorConfig
