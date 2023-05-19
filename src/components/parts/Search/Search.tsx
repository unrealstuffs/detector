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
import IntervalConverter from './components/IntervalConverter/IntervalConverter'
import SearchData from './types/SearchData.interface'
import Lines from './components/Lines/Lines'
import { sendSearchData } from './utils/sendSeachData'
import { resetSearch } from './utils/resetSearch'
import Vehicles from './components/Vehicles/Vehicles'
import Statements from './components/Statements/Statements'
import Directions from './components/Directions/Directions'

const Search: FC<{
	tableName: string
	setData: (state: DataState) => void
	setStatus: (status: Fetch) => void
}> = ({ tableName, setData, setStatus }) => {
	const { resetSearchFor } = useActions()

	const searchRef = useRef<Flatpickr>(null)
	const secondSearchRef = useRef<Flatpickr>(null)

	const { accessToken } = useTypedSelector(state => state.user)

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
				<button
					className={styles.delete}
					onClick={() => {
						if (!searchRef?.current?.flatpickr) return
						if (!secondSearchRef?.current?.flatpickr) return
						searchRef.current!.flatpickr.clear()
						secondSearchRef.current!.flatpickr.clear()
						resetSearch(
							setStatus,
							setSearchData,
							resetSearchFor,
							tableName
						)
					}}
				>
					<AiOutlineClose size={20} />
				</button>
				<button
					className={styles.button}
					onClick={() => {
						setStatus('loading')
						setSearchFor(tableName)
						//@ts-ignore
						setData(prev => ({
							...prev,
							[tableName]: [],
						}))
						sendSearchData(
							searchData,
							tableName,
							accessToken,
							setStatus
						)
					}}
				>
					Поиск
				</button>
			</div>
			<div className={styles.searchFields}>
				<Lines setSearchData={setSearchData} />
				<Directions setSearchData={setSearchData} />
				{tableName === 'types' && (
					<>
						<Vehicles setSearchData={setSearchData} />
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
						<Vehicles setSearchData={setSearchData} />
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
							<Statements setSearchData={setSearchData} />
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
						<Statements setSearchData={setSearchData} />
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
						<Statements setSearchData={setSearchData} />
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
						<Statements setSearchData={setSearchData} />
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
						<Statements setSearchData={setSearchData} />
					</div>
				)}
			</div>
		</div>
	)
}

export default Search
