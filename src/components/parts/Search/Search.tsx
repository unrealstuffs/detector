import { FC, useRef, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import 'react-tooltip/dist/react-tooltip.css'
import styles from './Search.module.scss'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { DataState } from '../../../types/Data'
import { AiOutlineClose } from 'react-icons/ai'
import { Fetch } from '../../../types/Fetch'
import IntervalConverter from './IntervalConverter/IntervalConverter'
import SearchData from './types/SearchData.interface'

const Search: FC<{
	tableName: string
	setData: (state: DataState) => void
	setStatus: (status: Fetch) => void
}> = ({ tableName, setData, setStatus }) => {
	const { resetSearchFor } = useActions()

	const searchRef = useRef<Flatpickr>(null)
	const secondSearchRef = useRef<Flatpickr>(null)

	const { accessToken } = useTypedSelector(state => state.user)
	const { configuration } = useTypedSelector(state => state.detector)
	const { setSearchFor } = useActions()

	const [searchData, setSearchData] = useState<SearchData>({
		licensePlates: [],
		vehicleTypes: [],
		directions: [],
		lines: [],
		interval: 0,
		intensity: { value: '', statement: 'more' },
		quantity: { value: '', statement: 'more' },
		avgSpeed: { value: '', statement: 'more' },
		avgDelay: { value: '', statement: 'more' },
		density: { value: '', statement: 'more' },
		timestampRange: {
			from: '',
			to: '',
		},
	})

	const resetSearch = () => {
		setStatus('init')
		if (!searchRef?.current?.flatpickr) return
		if (!secondSearchRef?.current?.flatpickr) return
		searchRef.current!.flatpickr.clear()
		secondSearchRef.current!.flatpickr.clear()

		setSearchData({
			licensePlates: [],
			vehicleTypes: [],
			directions: [],
			lines: [],
			interval: 0,
			intensity: { value: '', statement: 'more' },
			quantity: { value: '', statement: 'more' },
			avgSpeed: { value: '', statement: 'more' },
			avgDelay: { value: '', statement: 'more' },
			density: { value: '', statement: 'more' },
			timestampRange: {
				from: '',
				to: '',
			},
		})

		resetSearchFor(tableName)

		//@ts-ignore
		setData(prev => ({
			...prev,
			[tableName]: [],
		}))
	}

	const sendSearchData = async () => {
		if (!searchData.timestampRange.from || !searchData.timestampRange.to) {
			return
		}
		setStatus('loading')
		//@ts-ignore
		setData(prev => ({
			...prev,
			[tableName]: [],
		}))

		let url = ''
		setSearchFor(tableName)

		let searchObject = {}

		switch (tableName) {
			case 'types':
				url = `${process.env.REACT_APP_SET_VEHICLE_TYPES_AND_PLATES}`
				searchObject = {
					licensePlates: searchData.licensePlates,
					vehicleTypes: searchData.vehicleTypes,
					directions: searchData.directions,
					lines: searchData.lines,
					timestampRange: {
						from: searchData.timestampRange.from,
						to: searchData.timestampRange.to,
					},
				}
				break
			case 'intensity':
				url = `${process.env.REACT_APP_SET_TRAFFIC_INTENSITY}`
				searchObject = {
					directions: searchData.directions,
					lines: searchData.lines,
					intensity: {
						value: searchData.intensity.value || '0',
						statement: searchData.intensity.value
							? searchData.intensity.statement
							: 'more',
					},
					timestampRange: {
						from: searchData.timestampRange.from,
						to: searchData.timestampRange.to,
					},
				}
				break
			case 'composition':
				url = `${process.env.REACT_APP_SET_VEH_COMPOSITION}`
				searchObject = {
					vehicleTypes: searchData.vehicleTypes,
					directions: searchData.directions,
					lines: searchData.lines,
					interval: searchData.interval || 0,
					quantity: {
						value: searchData.quantity.value || '0',
						statement: searchData.quantity.value
							? searchData.quantity.statement
							: 'more',
					},
					timestampRange: {
						from: searchData.timestampRange.from,
						to: searchData.timestampRange.to,
					},
				}
				break
			case 'speed':
				url = `${process.env.REACT_APP_SET_AVERAGE_SPEED}`
				searchObject = {
					directions: searchData.directions,
					lines: searchData.lines,
					avgSpeed: {
						value: searchData.avgSpeed.value || '0',
						statement: searchData.avgSpeed.value
							? searchData.avgSpeed.statement
							: 'more',
					},
					timestampRange: {
						from: searchData.timestampRange.from,
						to: searchData.timestampRange.to,
					},
				}
				break
			case 'delay':
				url = `${process.env.REACT_APP_SET_AVERAGE_DELAY}`
				searchObject = {
					directions: searchData.directions,
					lines: searchData.lines,
					avgDelay: {
						value: searchData.avgDelay.value || '0',
						statement: searchData.avgDelay.value
							? searchData.avgDelay.statement
							: 'more',
					},
					timestampRange: {
						from: searchData.timestampRange.from,
						to: searchData.timestampRange.to,
					},
				}
				break
			case 'density':
				url = `${process.env.REACT_APP_SET_TRAFFIC_DENSITY}`
				searchObject = {
					directions: searchData.directions,
					lines: searchData.lines,
					density: {
						value: searchData.density.value || '0',
						statement: searchData.density.value
							? searchData.density.statement
							: 'more',
					},
					timestampRange: {
						from: searchData.timestampRange.from,
						to: searchData.timestampRange.to,
					},
				}
				break
			default:
				return
		}

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					Authorization: `${accessToken}`,
				},
				body: JSON.stringify(searchObject),
			})

			const responseData = await response.json()

			if (!JSON.parse(responseData.data).length) {
				setStatus('nodata')

				//@ts-ignore
				setData(prev => ({
					...prev,
					[tableName]: [],
				}))
			} else {
				//@ts-ignore
				setData(prev => ({
					...prev,
					[tableName]: JSON.parse(responseData.data).slice(0, 100),
				}))

				setStatus('success')
			}
		} catch {
			setStatus('error')
		}
	}

	return (
		<div className={styles.search}>
			<div className={styles.datePicker}>
				<div className={styles.dateFields}>
					<Flatpickr
						ref={searchRef}
						options={{
							dateFormat: 'd-m-Y H:i:S',
							defaultDate: searchData.timestampRange.from,
							disableMobile: true,
							enableTime: true,
							enableSeconds: true,
							locale: Russian,
							maxDate: 'today',
							minuteIncrement: 1,
						}}
						placeholder='От'
						className={`${styles.dateInput} ${styles.input}`}
						onClose={selectedDate =>
							setSearchData(prev => ({
								...prev,
								timestampRange: {
									...prev.timestampRange,
									from: selectedDate[0],
								},
							}))
						}
					/>
					<Flatpickr
						ref={secondSearchRef}
						options={{
							dateFormat: 'd-m-Y H:i:S',
							defaultDate: searchData.timestampRange.to,
							disableMobile: true,
							enableTime: true,
							enableSeconds: true,
							locale: Russian,
							minDate: searchData.timestampRange.from,
							maxDate: 'today',
							minuteIncrement: 1,
						}}
						placeholder='До'
						className={`${styles.dateInput} ${styles.input}`}
						onChange={selectedDate =>
							setSearchData(prev => ({
								...prev,
								timestampRange: {
									...prev.timestampRange,
									to: selectedDate[0],
								},
							}))
						}
					/>
					{tableName === 'composition' && (
						<IntervalConverter setSearchData={setSearchData} />
					)}
				</div>
				<button className={styles.delete} onClick={resetSearch}>
					<AiOutlineClose size={20} />
				</button>
				<button className={styles.button} onClick={sendSearchData}>
					Поиск
				</button>
			</div>
			<div className={styles.searchFields}>
				<select
					className={styles.select}
					onChange={e =>
						setSearchData(prev => ({
							...prev,
							lines: e.target.value ? [e.target.value] : [],
						}))
					}
				>
					<option value='' selected>
						Все полосы
					</option>
					<option value='l_0'>l-1</option>
					<option value='l_1'>l-2</option>
					<option value='l_2'>l-3</option>
				</select>
				<select
					className={styles.select}
					onChange={e =>
						setSearchData(prev => ({
							...prev,
							directions: e.target.value ? [e.target.value] : [],
						}))
					}
				>
					<option value='' selected>
						Все направления
					</option>
					{Object.keys(configuration).map(val => (
						<option value={val}>
							{configuration[val].reverseDirection
								? 'Обратное'
								: 'Прямое'}
						</option>
					))}
				</select>
				{tableName === 'types' && (
					<>
						<select
							className={styles.select}
							onChange={e =>
								setSearchData(prev => ({
									...prev,
									vehicleTypes: e.target.value
										? [e.target.value]
										: [],
								}))
							}
						>
							<option value='' selected>
								Тип ТС
							</option>
							<option value='автобус'>Автобус</option>
							<option value='легковой'>Легковой</option>
							<option value='микроавтобус'>Микроавтобус</option>
							<option value='небольшой грузовик'>
								Небольшой грузовик
							</option>
						</select>
						<input
							type='text'
							placeholder='Номер ГРЗ...'
							className={styles.input}
							value={searchData.licensePlates[0] || ''}
							onChange={e =>
								setSearchData(prev => ({
									...prev,
									licensePlates: e.target.value
										? [e.target.value]
										: [],
								}))
							}
						/>
					</>
				)}
				{tableName === 'composition' && (
					<>
						<select
							className={styles.select}
							onChange={e =>
								setSearchData(prev => ({
									...prev,
									vehicleTypes: e.target.value
										? [e.target.value]
										: [],
								}))
							}
						>
							<option value='' selected>
								Тип ТС
							</option>
							<option value='автобус'>Автобус</option>
							<option value='легковой'>Легковой</option>
							<option value='микроавтобус'>Микроавтобус</option>
							<option value='небольшой грузовик'>
								Небольшой грузовик
							</option>
						</select>
						<div className={styles.numField}>
							<input
								type='number'
								placeholder='Количество...'
								className={styles.input}
								value={searchData.quantity.value}
								onChange={e =>
									setSearchData(prev => ({
										...prev,
										quantity: {
											...prev.quantity,
											value: e.target.value,
										},
									}))
								}
							/>
							<select
								className={styles.select}
								onChange={e =>
									setSearchData(prev => ({
										...prev,
										quantity: {
											...prev.quantity,
											statement: e.target.value,
										},
									}))
								}
							>
								<option value='more'>Больше</option>
								<option value='less'>Меньше</option>
								<option value='equal'>Равно</option>
							</select>
						</div>
					</>
				)}
				{tableName === 'intensity' && (
					<div className={styles.numField}>
						<input
							type='number'
							placeholder='Интенсивность...'
							className={styles.input}
							value={searchData.intensity.value}
							onChange={e =>
								setSearchData(prev => ({
									...prev,
									intensity: {
										...prev.intensity,
										value: e.target.value,
									},
								}))
							}
						/>
						<select
							className={styles.select}
							onChange={e =>
								setSearchData(prev => ({
									...prev,
									intensity: {
										...prev.intensity,
										statement: e.target.value,
									},
								}))
							}
						>
							<option value='more'>Больше</option>
							<option value='less'>Меньше</option>
							<option value='equal'>Равно</option>
						</select>
					</div>
				)}
				{tableName === 'speed' && (
					<div className={styles.numField}>
						<input
							type='number'
							placeholder='Средняя скорость...'
							className={styles.input}
							value={searchData.avgSpeed.value}
							onChange={e =>
								setSearchData(prev => ({
									...prev,
									avgSpeed: {
										...prev.avgSpeed,
										value: e.target.value,
									},
								}))
							}
						/>
						<select
							className={styles.select}
							onChange={e =>
								setSearchData(prev => ({
									...prev,
									avgSpeed: {
										...prev.avgSpeed,
										statement: e.target.value,
									},
								}))
							}
						>
							<option value='more'>Больше</option>
							<option value='less'>Меньше</option>
							<option value='equal'>Равно</option>
						</select>
					</div>
				)}
				{tableName === 'density' && (
					<div className={styles.numField}>
						<input
							type='number'
							placeholder='Плотность...'
							className={styles.input}
							value={searchData.density.value}
							onChange={e =>
								setSearchData(prev => ({
									...prev,
									density: {
										...prev.density,
										value: e.target.value,
									},
								}))
							}
						/>
						<select
							className={styles.select}
							onChange={e =>
								setSearchData(prev => ({
									...prev,
									density: {
										...prev.density,
										statement: e.target.value,
									},
								}))
							}
						>
							<option value='more'>Больше</option>
							<option value='less'>Меньше</option>
							<option value='equal'>Равно</option>
						</select>
					</div>
				)}
				{tableName === 'delay' && (
					<div className={styles.numField}>
						<input
							type='number'
							placeholder='Средняя задержка...'
							className={styles.input}
							value={searchData.avgDelay.value}
							onChange={e =>
								setSearchData(prev => ({
									...prev,
									avgDelay: {
										...prev.avgDelay,
										value: e.target.value,
									},
								}))
							}
						/>
						<select
							className={styles.select}
							onChange={e =>
								setSearchData(prev => ({
									...prev,
									avgDelay: {
										...prev.avgDelay,
										statement: e.target.value,
									},
								}))
							}
						>
							<option value='more'>Больше</option>
							<option value='less'>Меньше</option>
							<option value='equal'>Равно</option>
						</select>
					</div>
				)}
			</div>
		</div>
	)
}

export default Search
