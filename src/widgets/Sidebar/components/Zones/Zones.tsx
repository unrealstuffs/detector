import { AiOutlineClose } from 'react-icons/ai'

import styles from './Zones.module.scss'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useTypedSelector } from '../../../../shared/hooks/useTypedSelector'
import { useActions } from '../../../../shared/hooks/useActions'
import { AppDispatch } from '../../../../app/store'
import { sendConfiguration } from '../../../../app/store/slices/configurationSlice'
import Button from '../../../../shared/ui/Button/Button'

const Zones = () => {
	const { configuration, selectedPolygon, status, videoSize } =
		useTypedSelector(state => state.configuration)
	const { accessToken } = useTypedSelector(state => state.user)
	const {
		setSelectedPolygon,
		addZone,
		addLine,
		addCounter,
		removeZone,
		removeLine,
		removeCounter,
		setDirection,
		setLineLength,
		removeConfiguration,
		setStatus,
	} = useActions()
	const dispatch = useDispatch<AppDispatch>()
	const [showConfig, setShowConfig] = useState(false)

	const sendConfigurationHandler = async () => {
		const data = {
			base_size: [videoSize.width, videoSize.height],
			zone: {
				r_00: {
					pl: [
						[0, 0],
						[videoSize.width, 0],
						[videoSize.width, videoSize.height],
						[0, videoSize.height],
					],
					s: {
						...configuration,
					},
				},
			},
		}
		dispatch(
			sendConfiguration({ accessToken: `${accessToken}`, body: data })
		)
		setTimeout(() => {
			setStatus('init')
		}, 1000)
	}

	return (
		<div className={styles.zoneConfig}>
			<div className={styles.zoneActions}>
				<Button
					size='normal'
					type='primary'
					onClick={sendConfigurationHandler}
					disabled={status !== 'init'}
				>
					{status === 'init' && 'Сохранить'}
					{status === 'error' && 'Ошибка'}
					{status === 'loading' && 'Загрузка...'}
					{status === 'success' && 'Отправлено!'}
				</Button>
				<Button
					size='normal'
					type='danger'
					onClick={removeConfiguration}
				>
					Удалить
				</Button>
			</div>
			<div className={styles.zoneBlock}>
				<div className={styles.zoneHeader}>Зоны</div>
				<div className={styles.zoneBody}>
					<div className={styles.zoneActions}>
						<Button
							size='small'
							type='primary'
							onClick={() => addZone()}
						>
							Новая зона
						</Button>
					</div>
					<div className={styles.inputGroup}>
						{Object.keys(configuration).map((zone, index) => (
							<div key={index}>
								<div className={styles.inputLine}>
									<span
										className={
											selectedPolygon.length === 1 &&
											[zone].every(value =>
												selectedPolygon.includes(value)
											)
												? styles.selected
												: ''
										}
										onClick={() => {
											const isCurrentZone =
												selectedPolygon.length === 1 &&
												selectedPolygon[0] === zone

											setSelectedPolygon(
												isCurrentZone ? [] : [zone]
											)
										}}
									>{`d-${index + 1}`}</span>
									<Button
										size='rounded'
										type='transparent'
										onClick={() =>
											removeZone({ key: zone })
										}
									>
										<AiOutlineClose />
									</Button>
								</div>
								<label className={styles.zoneCheck}>
									<input
										type='checkbox'
										checked={
											configuration[zone].reverseDirection
										}
										onChange={e =>
											setDirection({
												zone,
												checked: e.target.checked,
											})
										}
									/>
									Обратное движение
								</label>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.zoneBlock}>
				<div className={styles.zoneHeader}>Полосы</div>
				<div className={styles.zoneBody}>
					<div className={styles.zoneActions}>
						<Button
							size='small'
							type='primary'
							disabled={selectedPolygon.length !== 1}
							onClick={() => addLine()}
						>
							Новая полоса
						</Button>
					</div>
					<div className={styles.inputGroup}>
						{Object.keys(configuration).map((zone, index) =>
							Object.keys(configuration[zone]['s']).map(
								(line, lineIndex) => (
									<div
										key={lineIndex}
										className={styles.inputLine}
									>
										<span
											className={
												selectedPolygon.length === 3 &&
												[zone, 's', line].every(value =>
													selectedPolygon.includes(
														value
													)
												)
													? styles.selected
													: ''
											}
											onClick={() => {
												const isCurrentZone =
													selectedPolygon.length ===
														3 &&
													selectedPolygon[0] ===
														zone &&
													selectedPolygon[2] === line
												setSelectedPolygon(
													isCurrentZone
														? []
														: [zone, 's', line]
												)
											}}
										>
											{`d-${index + 1} l-${
												lineIndex + 1
											}`}
										</span>
										<input
											type='number'
											min={0}
											max={99}
											value={
												configuration[zone]['s'][line][
													'length'
												]
											}
											onChange={e => {
												setLineLength({
													zone,
													line,
													value:
														+e.target.value < 1 ||
														+e.target.value >= 99
															? 1
															: +e.target.value,
												})
											}}
										/>

										<Button
											size='rounded'
											type='transparent'
											onClick={() =>
												removeLine({
													keys: [zone, line],
												})
											}
										>
											<AiOutlineClose />
										</Button>
									</div>
								)
							)
						)}
					</div>
				</div>
			</div>
			<div className={styles.zoneBlock}>
				<div className={styles.zoneHeader}>Счетчики</div>
				<div className={styles.zoneBody}>
					<div className={styles.zoneActions}>
						<Button
							size='small'
							type='primary'
							disabled={selectedPolygon.length !== 3}
							onClick={() => addCounter()}
						>
							Новый счетчик
						</Button>
					</div>
					<div className={styles.inputGroup}>
						{Object.keys(configuration).map((zone, index) =>
							Object.keys(configuration[zone]['s']).map(
								(line, lineIndex) =>
									Object.keys(
										configuration[zone]['s'][line]['s']
									).map((counter, counterIndex) => (
										<div
											key={counterIndex}
											className={styles.inputLine}
										>
											<span
												className={
													selectedPolygon.length ===
														5 &&
													[
														zone,
														's',
														line,
														's',
														counter,
													].every(value =>
														selectedPolygon.includes(
															value
														)
													)
														? styles.selected
														: ''
												}
												onClick={() => {
													const isCurrentZone =
														selectedPolygon.length ===
															5 &&
														selectedPolygon[0] ===
															zone &&
														selectedPolygon[2] ===
															line &&
														selectedPolygon[4] ===
															counter
													setSelectedPolygon(
														isCurrentZone
															? []
															: [
																	zone,
																	's',
																	line,
																	's',
																	counter,
															  ]
													)
												}}
											>
												{`d-${index + 1} l-${
													lineIndex + 1
												} s-${counterIndex + 1}`}
											</span>

											<Button
												size='rounded'
												type='transparent'
												onClick={() =>
													removeCounter({
														keys: [
															zone,
															line,
															counter,
														],
													})
												}
											>
												<AiOutlineClose />
											</Button>
										</div>
									))
							)
						)}
					</div>
				</div>
			</div>
			<div className={styles.zoneBlock}>
				<div className={styles.zoneHeader}>Конфигурация</div>
				<div className={styles.zoneBody}>
					<div className={styles.zoneActions}>
						<Button
							size='small'
							type='primary'
							onClick={() => setShowConfig(!showConfig)}
						>
							Конфигурация
						</Button>
					</div>
					<div className={styles.config}>
						{showConfig && (
							<pre>{JSON.stringify(configuration, null, 4)}</pre>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Zones
