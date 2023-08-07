import React, { useState, useEffect } from 'react'
import styles from './IntervalConverter.module.scss'
import SearchData from '../../model/types/SearchData'

type UnitsType = 'seconds' | 'minutes' | 'hours' | 'days'

const IntervalConverter = ({
	setSearchData,
}: {
	setSearchData: React.Dispatch<React.SetStateAction<SearchData>>
}) => {
	const [value, setValue] = useState<string>('')
	const [unit, setUnit] = useState<UnitsType>('seconds')
	const [convertedValue, setConvertedValue] = useState<number>(0)

	useEffect(() => {
		setSearchData(prev => ({
			...prev,
			interval: convertedValue,
		}))
	}, [convertedValue, setSearchData])

	const convertToSeconds = (value: number, unit: UnitsType): number => {
		let seconds: number = 0
		switch (unit) {
			case 'days':
				seconds = value * 24 * 60 * 60
				break
			case 'hours':
				seconds = value * 60 * 60
				break
			case 'minutes':
				seconds = value * 60
				break
			default:
				seconds = value
				break
		}

		return seconds
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(e.target.value)
		setValue(e.target.value)
		setConvertedValue(convertToSeconds(newValue, unit))
	}

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newUnit = e.target.value as UnitsType
		setUnit(newUnit)
		setConvertedValue(convertToSeconds(+value, newUnit))
	}

	return (
		<>
			<input
				type='number'
				placeholder='Интервал...'
				className={styles.input}
				value={value}
				onChange={handleInputChange}
			/>
			<select
				value={unit}
				onChange={handleSelectChange}
				className={styles.select}
			>
				<option value='seconds'>Секунд</option>
				<option value='minutes'>Минут</option>
				<option value='hours'>Часов</option>
				<option value='days'>Дней</option>
			</select>
		</>
	)
}

export default IntervalConverter
