import SearchDataSchema from '../../model/types/SearchData'
import Directions from '../Directions/Directions'
import Lines from '../Lines/Lines'
import { Dispatch, SetStateAction } from 'react'
import cls from './SearchFields.module.scss'
import { classNames } from 'shared/lib/classNames'
import Vehicles from '../Vehicles/Vehicles'
import { Input } from 'shared/ui/Input/Input'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import Statements from '../Statements/Statements'

interface SearchFieldsProps {
	className?: string
	setSearchData: Dispatch<SetStateAction<SearchDataSchema>>
	searchData: SearchDataSchema
	tableName: string
}

const SearchFields = (props: SearchFieldsProps) => {
	const { setSearchData, tableName, className, searchData } = props
	return (
		<div className={classNames(cls.SearchFields, {}, [className])}>
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
					<HStack gap='8'>
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
					</HStack>
				</>
			)}
			{tableName === 'intensity' && (
				<HStack gap='8'>
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
				</HStack>
			)}
			{tableName === 'speed' && (
				<HStack gap='8'>
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
				</HStack>
			)}
			{tableName === 'density' && (
				<HStack gap='8'>
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
				</HStack>
			)}
			{tableName === 'delay' && (
				<HStack gap='8'>
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
				</HStack>
			)}
		</div>
	)
}

export default SearchFields
