import { useRef, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import 'react-tooltip/dist/react-tooltip.css'
import cls from './SearchData.module.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { FetchStatus } from 'shared/types/FetchStatus'
import SearchDataSchema from '../../model/types/SearchData'
import IntervalConverter from '../IntervalConverter/IntervalConverter'
import Lines from '../Lines/Lines'
import Directions from '../Directions/Directions'
import Vehicles from '../Vehicles/Vehicles'
import Statements from '../Statements/Statements'
import { searchActions } from '../../model/slices/searchSlice'
import { initialSearchState } from '../../model/consts/initialSearchState'
import { searchTypes } from '../../model/services/searchTypes'
import { searchComposition } from '../../model/services/searchComposition'
import { searchDelay } from '../../model/services/searchDelay'
import { searchDensity } from '../../model/services/searchDensity'
import { searchIntensity } from '../../model/services/searchIntensity'
import { searchSpeed } from '../../model/services/searchSpeed'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { TableNameType, dataActions } from 'widgets/DataList'
import Button from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { classNames } from 'shared/lib/classNames'

interface SearchDataProps {
	className?: string
	tableName: TableNameType
	setStatus: (status: FetchStatus) => void
}

export const SearchData = (props: SearchDataProps) => {
	const { tableName, setStatus, className } = props
	const searchRef = useRef<Flatpickr>(null)
	const secondSearchRef = useRef<Flatpickr>(null)

	const dispatch = useAppDispatch()

	const [searchData, setSearchData] = useState(
		initialSearchState as SearchDataSchema
	)

	const resetSearchHandler = () => {
		if (!searchRef?.current?.flatpickr) return
		if (!secondSearchRef?.current?.flatpickr) return
		searchRef.current!.flatpickr.clear()
		secondSearchRef.current!.flatpickr.clear()
		setStatus('init')
		setSearchData(initialSearchState as SearchDataSchema)
		searchActions.resetSearchFor(tableName)
		dataActions.resetData(tableName)
	}

	const sendSearchHandler = () => {
		setStatus('loading')
		searchActions.setSearchFor(tableName)
		dataActions.resetData(tableName)

		switch (tableName) {
			case 'types':
				dispatch(searchTypes(searchData))
				break
			case 'composition':
				dispatch(searchComposition(searchData))
				break
			case 'delay':
				dispatch(searchDelay(searchData))
				break
			case 'density':
				dispatch(searchDensity(searchData))
				break
			case 'intensity':
				dispatch(searchIntensity(searchData))
				break
			case 'speed':
				dispatch(searchSpeed(searchData))
				break
			default:
				return
		}
	}

	return (
		<div className={classNames(cls.SearchData, {}, [className])}>
			<div className={cls.datePicker}>
				<div className={cls.dateFields}>
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
						className={classNames(cls.dateInput, {}, [cls.input])}
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
						className={classNames(cls.dateInput, {}, [cls.input])}
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
				<AiOutlineClose
					size={20}
					className={cls.delete}
					onClick={resetSearchHandler}
				/>
				<Button
					size='m'
					className={cls.button}
					onClick={sendSearchHandler}
				>
					Поиск
				</Button>
			</div>
			<div className={cls.searchFields}>
				<Lines setSearchData={setSearchData} />
				<Directions setSearchData={setSearchData} />
				{tableName === 'types' && (
					<>
						<Vehicles setSearchData={setSearchData} />
						<Input
							size='m'
							placeholder='Номер ГРЗ...'
							value={searchData.licensePlates[0] || ''}
							className={cls.input}
							onChange={value =>
								setSearchData(prev => ({
									...prev,
									licensePlates: value ? [value] : [],
								}))
							}
						/>
					</>
				)}
				{tableName === 'composition' && (
					<>
						<Vehicles setSearchData={setSearchData} />
						<div className={cls.numField}>
							<Input
								type='number'
								placeholder='Количество...'
								className={cls.input}
								value={searchData.quantity.value}
								onChange={value =>
									setSearchData(prev => ({
										...prev,
										quantity: {
											...prev.quantity,
											value,
										},
									}))
								}
							/>
							<Statements setSearchData={setSearchData} />
						</div>
					</>
				)}
				{tableName === 'intensity' && (
					<div className={cls.numField}>
						<Input
							type='number'
							placeholder='Интенсивность...'
							className={cls.input}
							value={searchData.intensity.value}
							onChange={value =>
								setSearchData(prev => ({
									...prev,
									intensity: {
										...prev.intensity,
										value,
									},
								}))
							}
						/>
						<Statements setSearchData={setSearchData} />
					</div>
				)}
				{tableName === 'speed' && (
					<div className={cls.numField}>
						<Input
							type='number'
							placeholder='Средняя скорость...'
							className={cls.input}
							value={searchData.avgSpeed.value}
							onChange={value =>
								setSearchData(prev => ({
									...prev,
									avgSpeed: {
										...prev.avgSpeed,
										value,
									},
								}))
							}
						/>
						<Statements setSearchData={setSearchData} />
					</div>
				)}
				{tableName === 'density' && (
					<div className={cls.numField}>
						<Input
							type='number'
							placeholder='Плотность...'
							className={cls.input}
							value={searchData.density.value}
							onChange={value =>
								setSearchData(prev => ({
									...prev,
									density: {
										...prev.density,
										value,
									},
								}))
							}
						/>
						<Statements setSearchData={setSearchData} />
					</div>
				)}
				{tableName === 'delay' && (
					<div className={cls.numField}>
						<Input
							type='number'
							placeholder='Средняя задержка...'
							className={cls.input}
							value={searchData.avgDelay.value}
							onChange={value =>
								setSearchData(prev => ({
									...prev,
									avgDelay: {
										...prev.avgDelay,
										value,
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
