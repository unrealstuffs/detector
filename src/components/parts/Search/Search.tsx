import { FC, useRef, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import 'react-tooltip/dist/react-tooltip.css'
import styles from './Search.module.scss'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

const Search: FC<{ tableName: string }> = ({ tableName }) => {
	const { resetSearchFor } = useActions()

	const searchRef = useRef<Flatpickr>(null)
	const secondSearchRef = useRef<Flatpickr>(null)

	const { accessToken } = useTypedSelector(state => state.user)
	const { setSearchFor } = useActions()

	const [dates, setDates] = useState<{
		from: Date[] | null
		to: Date[] | null
	}>({
		from: null,
		to: null,
	})

	const resetSearch = () => {
		if (!searchRef?.current?.flatpickr) return
		if (!secondSearchRef?.current?.flatpickr) return
		searchRef.current!.flatpickr.clear()
		secondSearchRef.current!.flatpickr.clear()

		setDates({ from: null, to: null })

		resetSearchFor(tableName)

		//@ts-ignore
		setData(prev => ({
			...prev,
			[tableName]: [],
		}))
	}

	const sendSearchDates = async () => {
		if (!dates.from || !dates.to) {
			return
		}
		let url = ''

		setSearchFor(tableName)

		switch (tableName) {
			case 'types':
				url = `${process.env.REACT_APP_SET_VEHICLE_TYPES_AND_PLATES}`
				break
			case 'intensity':
				url = `${process.env.REACT_APP_SET_TRAFFIC_INTENSITY}`
				break
			case 'composition':
				url = `${process.env.REACT_APP_SET_VEH_COMPOSITION}`
				break
			case 'speed':
				url = `${process.env.REACT_APP_SET_AVERAGE_SPEED}`
				break
			case 'delay':
				url = `${process.env.REACT_APP_SET_AVERAGE_DELAY}`
				break
			case 'density':
				url = `${process.env.REACT_APP_SET_TRAFFIC_DENSITY}`
				break
			default:
				return
		}

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `${accessToken}`,
			},
			body: JSON.stringify({ from: dates.from[0], to: dates.to[0] }),
		})

		const responseData = await response.json()

		//@ts-ignore
		setData(prev => ({
			...prev,
			[tableName]: [],
		}))
		//@ts-ignore
		setData(prev => ({
			...prev,
			[tableName]: JSON.parse(responseData.data || []),
		}))
	}

	return (
		<div className={styles.search}>
			<div className={styles.datePicker}>
				<div className={styles.dateFields}>
					<Flatpickr
						ref={searchRef}
						options={{
							dateFormat: 'd-m-Y H:i',
							defaultDate: '',
							disableMobile: true,
							enableTime: true,
							locale: Russian,
							maxDate: 'today',
							minuteIncrement: 1,
						}}
						placeholder='От'
						className={`${styles.dateInput} ${styles.input}`}
						onClose={selectedDate =>
							setDates({
								from: selectedDate,
								to: dates.to,
							})
						}
					/>
					<Flatpickr
						ref={secondSearchRef}
						options={{
							dateFormat: 'd-m-Y H:i',
							defaultDate: '',
							disableMobile: true,
							enableTime: true,
							locale: Russian,
							maxDate: 'today',
							minuteIncrement: 1,
						}}
						placeholder='До'
						className={`${styles.dateInput} ${styles.input}`}
						onClose={selectedDate =>
							setDates({
								from: dates.from,
								to: selectedDate,
							})
						}
					/>
				</div>
				<button className={styles.button}>Поиск</button>
			</div>
			<div className={styles.searchFields}>
				<select className={styles.select}>
					<option value='_' selected>
						Полоса
					</option>
					<option value='l_0'>l-1</option>
					<option value='l_1'>l-2</option>
					<option value='l_2'>l-3</option>
				</select>
				<select className={styles.select}>
					<option value='_' selected>
						Направление
					</option>
					<option value='d_0'>Прямое</option>
					<option value='d_1'>Обратное</option>
				</select>
				{tableName === 'types' && (
					<>
						<select className={styles.select}>
							<option value='_' selected>
								Тип ТС
							</option>
							<option value='Седан'>Седан</option>
							<option value='Купе'>Купе</option>
							<option value='Грузовая машина'>
								Грузовая машина
							</option>
							<option value='Автобус'>Автобус</option>
						</select>
						<input
							type='text'
							placeholder='Номер ГРЗ...'
							className={styles.input}
						/>
					</>
				)}
				{tableName === 'composition' && (
					<>
						<select className={styles.select}>
							<option value='_' selected>
								Тип ТС
							</option>
							<option value='Седан'>Седан</option>
							<option value='Купе'>Купе</option>
							<option value='Грузовая машина'>
								Грузовая машина
							</option>
							<option value='Автобус'>Автобус</option>
						</select>
						<input
							type='number'
							placeholder='Количество...'
							className={styles.input}
						/>
					</>
				)}
				{tableName === 'intensity' && (
					<input
						type='number'
						placeholder='Интенсивность...'
						className={styles.input}
					/>
				)}
				{tableName === 'speed' && (
					<input
						type='number'
						placeholder='Средняя скорость...'
						className={styles.input}
					/>
				)}
				{tableName === 'density' && (
					<input
						type='number'
						placeholder='Плотность...'
						className={styles.input}
					/>
				)}
				{tableName === 'delay' && (
					<input
						type='number'
						placeholder='Средняя задержка...'
						className={styles.input}
					/>
				)}
			</div>
		</div>
	)
}

export default Search
