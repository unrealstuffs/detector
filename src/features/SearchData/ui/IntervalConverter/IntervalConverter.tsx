import React, { useState, useEffect } from 'react'
import styles from './IntervalConverter.module.scss'
import SearchData from '../../model/types/SearchData'
import { Input } from 'shared/ui/Input/Input'
import Select from 'shared/ui/Select/Select'

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

	const handleInputChange = (value: string) => {
		const newValue = parseInt(value)
		setValue(value)
		setConvertedValue(convertToSeconds(newValue, unit))
	}

	const handleSelectChange = (value: string) => {
		const newUnit = value as UnitsType
		setUnit(newUnit)
		setConvertedValue(convertToSeconds(+value, newUnit))
	}

	return (
		<>
			<Input
				type='number'
				placeholder='Интервал...'
				className={styles.input}
				value={value}
				onChange={handleInputChange}
			/>
			<Select
				defaultValue={unit}
				options={[
					{ title: 'Секунд', value: 'seconds' },
					{ title: 'Минут', value: 'minutes' },
					{ title: 'Часов', value: 'hours' },
					{ title: 'Дней', value: 'days' },
				]}
				onChange={handleSelectChange}
				className={styles.select}
			/>
		</>
	)
}

export default IntervalConverter
