import dayjs from 'dayjs'
import { useEffect } from 'react'
import cls from './DataList.module.scss'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'app/store'
import { fetchComposition } from 'widgets/DataList/model/services/fetchComposition'
import { fetchDelay } from 'widgets/DataList/model/services/fetchDelay'
import { fetchIntensity } from 'widgets/DataList/model/services/fetchIntensity'
import { fetchSpeed } from 'widgets/DataList/model/services/fetchSpeed'
import { fetchDensity } from 'widgets/DataList/model/services/fetchDensity'
import { fetchTypes } from 'widgets/DataList/model/services/fetchTypes'
import DataBlock from '../DataBlock/DataBlock'
import { classNames } from 'shared/lib/classNames'

interface DataListProps {
	className?: string
}

export const DataList = (props: DataListProps) => {
	const { className } = props
	const { configuration } = useTypedSelector(state => state.markup)
	const { searchFor } = useTypedSelector(state => state.search)
	const { composition, delay, density, intensity, speed, types } =
		useTypedSelector(state => state.data)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(fetchComposition)
		dispatch(fetchDelay)
		dispatch(fetchIntensity)
		dispatch(fetchSpeed)
		dispatch(fetchDensity)
		dispatch(fetchTypes)
	}, [dispatch])

	useEffect(() => {
		const fetchLongTimer = setInterval(() => {
			!searchFor.includes('composition') && dispatch(fetchComposition)
			!searchFor.includes('delay') && dispatch(fetchDelay)
			!searchFor.includes('intensity') && dispatch(fetchIntensity)
			!searchFor.includes('speed') && dispatch(fetchSpeed)
			!searchFor.includes('density') && dispatch(fetchDensity)
		}, 1000 * 60 * 15)
		const fetchTypesTimer = setInterval(() => {
			!searchFor.includes('types') && dispatch(fetchTypes)
		}, 1000 * 10)

		return () => {
			clearInterval(fetchLongTimer)
			clearInterval(fetchTypesTimer)
		}
	}, [dispatch, searchFor])

	return (
		<div className={classNames(cls.DataList, {}, [className])}>
			<DataBlock
				header='Распознанные ГРЗ и классифицированные ТС'
				columns={[
					{
						Header: 'Время',
						id: 'timestamp',
						accessor: (d: any) => {
							return dayjs(d.timestamp).format(
								'DD-MM-YY HH:mm:ss'
							)
						},
					},
					{
						Header: 'ГРЗ',
						accessor: (d: any) => {
							if (d.licensePlate) {
								return d.licensePlate.replace(/!/g, '')
							} else {
								return d.licensePlate
							}
						},
					},
					{
						Header: 'ТС',
						accessor: 'type',
					},
					{
						Header: 'Направление',
						accessor: (d: any) => {
							if (
								configuration[d.direction] &&
								configuration[d.direction].reverseDirection
							) {
								return 'Обратное'
							} else {
								return 'Прямое'
							}
						},
					},
					{
						Header: 'Полоса',
						accessor: (d: any) => {
							if (d.line) {
								let lineArray = d.line.split('_')
								let lineName = `l-${++lineArray[1]}`
								return lineName
							} else {
								return d.line
							}
						},
					},
				]}
				tooltipText='Список всех распознанных ГРЗ и соответствующих типов ТС по направлениям и полосам'
				data={types}
				tableName='types'
			/>
			<DataBlock
				header='Состав транспортных средств'
				columns={[
					{
						id: 'timestampRange',
						Header: 'Время',
						accessor: (d: any) => {
							if (d.timestampRange) {
								return `${dayjs(d.timestampRange.from).format(
									'DD-MM-YY HH:mm:ss'
								)} \n ${dayjs(d.timestampRange.to).format(
									'DD-MM-YY HH:mm:ss'
								)}`
							}
							return dayjs(d.timestamp).format(
								'DD-MM-YY HH:mm:ss'
							)
						},
					},
					{
						Header: 'Направление',
						accessor: (d: any) => {
							if (
								configuration[d.direction] &&
								configuration[d.direction].reverseDirection
							) {
								return 'Обратное'
							} else {
								return 'Прямое'
							}
						},
					},
					{
						Header: 'Полоса',
						accessor: (d: any) => {
							if (d.line) {
								let lineArray = d.line.split('_')
								let lineName = `l-${++lineArray[1]}`
								return lineName
							} else {
								return d.line
							}
						},
					},
					{
						Header: 'Тип ТС',
						accessor: 'vehicleType',
					},
					{ Header: 'Количество', accessor: 'quantity' },
				]}
				tooltipText='Количество транспортных средств каждой расчетной категории (европейской классификации транспортного потока EUR 6), проследовавших за одну минуту в определенном направлении и полосе (ед.). Интервал разбиения указывает, с каким периодом нужно запрашивать данные, при указании 0 или пустого поля, будет выведена суммарная информация за запрашиваемый период времени.'
				data={composition}
				tableName='composition'
			/>
			<DataBlock
				header='Интенсивность дорожного движения'
				columns={[
					{
						Header: 'Время',
						id: 'timestamp',
						accessor: (d: any) => {
							return dayjs(d.timestamp).format(
								'DD-MM-YY HH:mm:ss'
							)
						},
					},
					{
						Header: 'Направление',
						accessor: (d: any) => {
							if (
								configuration[d.direction] &&
								configuration[d.direction].reverseDirection
							) {
								return 'Обратное'
							} else {
								return 'Прямое'
							}
						},
					},
					{
						Header: 'Полоса',
						accessor: (d: any) => {
							if (d.line) {
								let lineArray = d.line.split('_')
								let lineName = `l-${++lineArray[1]}`
								return lineName
							} else {
								return d.line
							}
						},
					},
					{ Header: 'Интенсивность', accessor: 'intensity' },
				]}
				tooltipText='Количество транспортных средств,
проходящих за один час в определенном направлении и полосе (авто/час)'
				data={intensity}
				tableName='intensity'
			/>
			<DataBlock
				header='Средняя скорость движения ТС'
				columns={[
					{
						Header: 'Время',
						id: 'timestamp',
						accessor: (d: any) => {
							return dayjs(d.timestamp).format(
								'DD-MM-YY HH:mm:ss'
							)
						},
					},
					{
						Header: 'Направление',
						accessor: (d: any) => {
							if (
								configuration[d.direction] &&
								configuration[d.direction].reverseDirection
							) {
								return 'Обратное'
							} else {
								return 'Прямое'
							}
						},
					},
					{
						Header: 'Полоса',
						accessor: (d: any) => {
							if (d.line) {
								let lineArray = d.line.split('_')
								let lineName = `l-${++lineArray[1]}`
								return lineName
							} else {
								return d.line
							}
						},
					},
					{ Header: 'Средняя скорость', accessor: 'avgSpeed' },
				]}
				tooltipText='Среднее арифметическое значений скоростей движения транспортных средств, проследовавших в одном
направлении по определенной полосе (км/час)'
				data={speed}
				tableName='speed'
			/>
			<DataBlock
				header='Плотность движения'
				columns={[
					{
						Header: 'Время',
						id: 'timestamp',
						accessor: (d: any) => {
							return dayjs(d.timestamp).format(
								'DD-MM-YY HH:mm:ss'
							)
						},
					},

					{
						Header: 'Направление',
						accessor: (d: any) => {
							if (
								configuration[d.direction] &&
								configuration[d.direction].reverseDirection
							) {
								return 'Обратное'
							} else {
								return 'Прямое'
							}
						},
					},
					{
						Header: 'Полоса',
						accessor: (d: any) => {
							if (d.line) {
								let lineArray = d.line.split('_')
								let lineName = `l-${++lineArray[1]}`
								return lineName
							} else {
								return d.line
							}
						},
					},
					{ Header: 'Плотность движения', accessor: 'density' },
				]}
				tooltipText='Среднее арифметическое значений скоростей движения транспортных средств, проследовавших в одном направлении по определенной полосе (км/час)'
				data={density}
				tableName='density'
			/>
			<DataBlock
				header='Средние задержки'
				columns={[
					{
						Header: 'Время',
						id: 'timestamp',
						accessor: (d: any) => {
							return dayjs(d.timestamp).format(
								'DD-MM-YY HH:mm:ss'
							)
						},
					},
					{
						Header: 'Направление',
						accessor: (d: any) => {
							if (
								configuration[d.direction] &&
								configuration[d.direction].reverseDirection
							) {
								return 'Обратное'
							} else {
								return 'Прямое'
							}
						},
					},
					{
						Header: 'Полоса',
						accessor: (d: any) => {
							if (d.line) {
								let lineArray = d.line.split('_')
								let lineName = `l-${++lineArray[1]}`
								return lineName
							} else {
								return d.line
							}
						},
					},
					{ Header: 'Средняя задержка', accessor: 'avgDelay' },
				]}
				tooltipText='Среднее время нахождения транспортного средства в зоне детектирования (сек.)'
				data={delay}
				tableName='delay'
			/>
		</div>
	)
}
