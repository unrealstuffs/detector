import { Fragment, useEffect, useState } from 'react'
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Message from '../../ui/Message/Message'
import { addPolygon } from '../Shot/utils'

import styles from './styles.module.scss'

interface IData {
	[key: string]: {
		[key: string]: number
	}
}

const ZoneConfig = () => {
	const { setConfiguration, setMode } = useActions()
	const { configuration, mode } = useTypedSelector(state => state.detector)

	const [zones, setZones] = useState<any>([])

	const { accessToken } = useTypedSelector(state => state.user)
	const [data, setData] = useState<IData>({})

	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)
	const [loading, setLoading] = useState(false)

	const changeHandler = (e: any, index: number, index_nested: number) => {
		setData((prev: any) => ({
			...prev,
			[`z-${index}`]: {
				...prev[`z-${index}`],
				[`${index_nested + 1}-${index_nested + 2}`]: e.target.value,
			},
		}))
	}

	const sendHandler = async () => {
		try {
			setLoading(true)
			const response = await fetch(
				`${process.env.REACT_APP_FIDUCIAL_POINTS_URL}`,
				{
					method: 'POST',
					body: JSON.stringify(data),
					headers: {
						Authorization: `${accessToken}`,
					},
				}
			)
			const resData = await response.json()

			if (resData.result === 'success') {
				setLoading(false)
				setSuccess(true)
				setTimeout(() => setSuccess(false), 4000)
			} else {
				setLoading(false)
				setError(true)
				setTimeout(() => setError(false), 4000)
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		const tempArr = []
		for (let key in configuration) {
			tempArr.push(configuration[key].pl)
		}
		setZones([...tempArr])
	}, [configuration])

	return (
		<div className={styles.zoneConfig}>
			<div className={styles.zoneBlock}>
				<div className={styles.zoneHeader}>Добавить зону</div>
				<div className={styles.zoneBody}>
					<button onClick={() => setMode('zone')}>
						<AiOutlineEdit />
					</button>
					<button
						disabled={mode !== 'zone'}
						onClick={() => {
							addPolygon(configuration, 'zone', setConfiguration)
						}}
					>
						<AiOutlinePlus />
					</button>
					<div className={styles.inputGroup}>
						{Object.keys(configuration).map((item, index) => {
							return (
								<input
									key={index}
									type='text'
									disabled
									value={`z-${index + 1}`}
									className={
										mode === 'zone' ? 'selected' : ''
									}
								/>
							)
						})}
					</div>
					<div className={styles.zoneDots}>
						{zones.map((zone: any, index: number) => (
							<Fragment key={index}>
								<span>z-{index + 1}</span>
								<div className={styles.dotsGroup}>
									{zone.map(
										(item: any, index_nested: number) => (
											<div
												key={index_nested}
												className={styles.numGroup}
											>
												<label>
													От точки {index_nested + 1}{' '}
													до точки{' '}
													{zone.length ===
													index_nested + 1
														? 1
														: index_nested + 2}
												</label>
												<input
													type='number'
													onChange={e =>
														changeHandler(
															e,
															index,
															index_nested
														)
													}
												/>
											</div>
										)
									)}
								</div>
							</Fragment>
						))}
					</div>
				</div>
				<div className={styles.configActions}>
					<button
						className='submit'
						type='submit'
						onClick={sendHandler}
					>
						Отправить
					</button>
					<Message
						loading={loading}
						success={success}
						error={error}
					/>
				</div>
			</div>
			<div className={styles.zoneBlock}>
				<div className={styles.zoneHeader}>Добавить полосу</div>
				<div className={styles.zoneBody}>
					<button onClick={() => setMode('line')}>
						<AiOutlineEdit />
					</button>
					<button
						disabled={mode !== 'line'}
						onClick={() => {
							addPolygon(configuration, 'line', setConfiguration)
						}}
					>
						<AiOutlinePlus />
					</button>
					<div className={styles.inputGroup}>
						{Object.keys(configuration).map((item, index) => {
							return Object.keys(
								configuration['d_' + index]['s']
							).map((item, lineIndex) => {
								return (
									<input
										key={lineIndex}
										type='text'
										disabled
										value={`z-${index + 1} l-${
											lineIndex + 1
										}`}
										className={
											mode === styles.line
												? styles.selected
												: ''
										}
									/>
								)
							})
						})}
					</div>
				</div>
			</div>
			<div className={styles.zoneBlock}>
				<div className={styles.zoneHeader}>Добавить счетчики</div>
				<div className={styles.zoneBody}>
					<button onClick={() => setMode('counter')}>
						<AiOutlineEdit />
					</button>
					<button
						disabled={mode !== 'counter'}
						onClick={() => {
							addPolygon(
								configuration,
								'counter',
								setConfiguration
							)
						}}
					>
						<AiOutlinePlus />
					</button>
					<div className={styles.inputGroup}>
						{Object.keys(configuration).map((item, index) => {
							return Object.keys(
								configuration['d_' + index]['s']
							).map((item, lineIndex) => {
								return Object.keys(
									configuration['d_' + index]['s'][
										'l_' + lineIndex
									]['s']
								).map((item, counterIndex) => {
									return (
										<input
											key={counterIndex}
											type='text'
											disabled
											value={`z-${index + 1} l-${
												lineIndex + 1
											} c-${counterIndex + 1}`}
											className={
												mode === styles.counter
													? styles.selected
													: ''
											}
										/>
									)
								})
							})
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ZoneConfig
