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
		fetchTypes(setData, accessToken)
		fetchIntensity(setData, accessToken)
		fetchComposition(setData, accessToken)
		fetchSpeed(setData, accessToken)
		fetchDelay(setData, accessToken)
		fetchDensity(setData, accessToken)
		const fetchTimer = setInterval(() => {
			searchFor !== 'intensity' && fetchIntensity(setData, accessToken)
			searchFor !== 'composition' &&
				fetchComposition(setData, accessToken)
			searchFor !== 'speed' && fetchSpeed(setData, accessToken)
			searchFor !== 'delay' && fetchDelay(setData, accessToken)
			searchFor !== 'density' && fetchDensity(setData, accessToken)
		}, 1000 * 60)
		const fetchTypesTimer = setInterval(() => {
			searchFor !== 'types' && fetchTypes(setData, accessToken)
		}, 1000 * 10)

		return () => {
			clearInterval(fetchTimer)
			clearInterval(fetchTypesTimer)
		}
	}, [accessToken, searchFor])

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
									.replace(/!/g, ' ')
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
								configuration &&
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
				tooltipText='Текст подсказки'
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
								configuration &&
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
				tooltipText='Текст подсказки'
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
								configuration &&
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
				tooltipText='Текст подсказки'
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
								configuration &&
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
				tooltipText='Текст подсказки'
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
								configuration &&
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
				tooltipText='Текст подсказки'
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
								configuration &&
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
				tooltipText='Текст подсказки'
				data={data.delay}
				tableName='delay'
			/>
		</div>
	)
}

export default Data
