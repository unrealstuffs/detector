import { useEffect } from 'react'
import { Table } from 'entities/Table'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import dayjs from 'dayjs'
import DataContainer from '../common/DataContainer/DataContainer'
import { densityActions } from '../../model/slices/densitySlice'
import { SearchDensity } from 'features/Search'
import { fetchDensity } from '../../model/api/fetchDensity'

export const DataDensity = () => {
	const { data, status, tableRows, blockFetching } = useTypedSelector(
		state => state.density
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (blockFetching) {
			return
		}
		dispatch(fetchDensity())
		const interval = setInterval(() => {
			dispatch(fetchDensity())
		}, 15 * 60 * 1000)

		return () => clearInterval(interval)
	}, [dispatch, blockFetching])

	return (
		<DataContainer
			onChangeRowsCount={value =>
				dispatch(densityActions.setTableRows(value))
			}
			searchForm={<SearchDensity />}
			title='Плотность движения'
			tooltipId='density'
			tooltipText='Среднее арифметическое значений скоростей движения транспортных средств, проследовавших в одном направлении по определенной полосе (км/час)'
		>
			<Table
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
							return 'Прямое'
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
				data={data}
				rowsCount={tableRows}
				status={status}
			/>
		</DataContainer>
	)
}
