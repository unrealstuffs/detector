import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import styles from './Data.module.scss'
import DataBlock from '../DataBlock/DataBlock'
import { DataState } from '../../../types/Data'
import {
	fetchComposition,
	fetchDelay,
	fetchDensity,
	fetchIntensity,
	fetchSpeed,
	fetchTypes,
} from './utils'

const Data = () => {
	const { configuration } = useTypedSelector(state => state.detector)
	const { accessToken } = useTypedSelector(state => state.user)
	const { searchFor } = useTypedSelector(state => state.search)

	const [data, setData] = useState({} as DataState)

	useEffect(() => {
		const fetchShortTimer = setInterval(() => {
			!searchFor.includes('composition') &&
				fetchComposition(setData, accessToken)
			!searchFor.includes('delay') && fetchDelay(setData, accessToken)
		}, 1000 * 60)
		const fetchLongTimer = setInterval(() => {
			!searchFor.includes('intensity') &&
				fetchIntensity(setData, accessToken)
			!searchFor.includes('speed') && fetchSpeed(setData, accessToken)
			!searchFor.includes('density') && fetchDensity(setData, accessToken)
		}, 1000 * 60 * 15)
		const fetchTypesTimer = setInterval(() => {
			!searchFor.includes('types') && fetchTypes(setData, accessToken)
		}, 1000 * 10)

		return () => {
			clearInterval(fetchShortTimer)
			clearInterval(fetchLongTimer)
			clearInterval(fetchTypesTimer)
		}
	}, [searchFor, accessToken])

	return (
		<div className={styles.data}>
			<DataBlock
				setData={setData}
				header='Распознанные ГРЗ и классифицированные ТС'
				columns={[
					{
						Header: 'Время',
						id: 'timestamp',
						accessor: (d: any) => {
							return dayjs(d.timestamp).format('DD-MM-YY HH:mm')
						},
					},
					{
						Header: 'ГРЗ',
						accessor: (d: any) => {
							if (d.licensePlate) {
								return d.licensePlate
									.replace(/!/g, '')
									.replace(/rf/, '')
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
				data={data.types}
				tableName='types'
			/>
			<DataBlock
				setData={setData}
				header='Состав транспортных средств'
				columns={[
					{
						id: 'timestamp',
						Header: 'Время',
						accessor: (d: any) => {
							return dayjs(d.timestamp).format('DD-MM-YY HH:mm')
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
				tooltipText='Количество транспортных средств каждой расчетной категории (европейской классификации транспортного потока EUR 6), проследовавших за одну минуту в определенном направлении и полосе (ед.)'
				data={data.composition}
				tableName='composition'
			/>
			<DataBlock
				setData={setData}
				header='Интенсивность дорожного движения'
				columns={[
					{
						Header: 'Время',
						id: 'timestamp',
						accessor: (d: any) => {
							return dayjs(d.timestamp).format('DD-MM-YY HH:mm')
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
				data={data.intensity}
				tableName='intensity'
			/>
			<DataBlock
				setData={setData}
				header='Средняя скорость движения ТС'
				columns={[
					{
						Header: 'Время',
						id: 'timestamp',
						accessor: (d: any) => {
							return dayjs(d.timestamp).format('DD-MM-YY HH:mm')
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
				data={data.speed}
				tableName='speed'
			/>
			<DataBlock
				setData={setData}
				header='Плотность движения'
				columns={[
					{
						Header: 'Время',
						id: 'timestamp',
						accessor: (d: any) => {
							return dayjs(d.timestamp).format('DD-MM-YY HH:mm')
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
				tooltipText='Отношение интенсивности дорожного движения к
средней скорости движения транспортных средств, приходящейся на один километр полосы движения (авто/км)'
				data={data.density}
				tableName='density'
			/>
			<DataBlock
				setData={setData}
				header='Средние задержки'
				columns={[
					{
						Header: 'Время',
						id: 'timestamp',
						accessor: (d: any) => {
							return dayjs(d.timestamp).format('DD-MM-YY HH:mm')
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
				data={data.delay}
				tableName='delay'
			/>
		</div>
	)
}

export default Data
