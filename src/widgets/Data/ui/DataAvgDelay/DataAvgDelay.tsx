import { useEffect } from 'react'
import { Table } from 'entities/Table'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import dayjs from 'dayjs'
import DataContainer from '../common/DataContainer/DataContainer'
import { avgDelayActions } from '../../model/slices/avgDelaySlice'
import { SearchAvgDelay } from 'features/Search'
import { fetchAvgDelay } from '../../model/api/fetchAvgDelay'

export const DataAvgDelay = () => {
	const { data, status, tableRows, blockFetching } = useTypedSelector(
		state => state.avgDelay
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (blockFetching) {
			return
		}
		dispatch(fetchAvgDelay())
		const interval = setInterval(() => {
			dispatch(fetchAvgDelay())
		}, 15 * 60 * 1000)

		return () => clearInterval(interval)
	}, [dispatch, blockFetching])

	return (
		<DataContainer
			onChangeRowsCount={value =>
				dispatch(avgDelayActions.setTableRows(value))
			}
			searchForm={<SearchAvgDelay />}
			title='Средние задержки'
			tooltipId='delay'
			tooltipText='Среднее время нахождения транспортного средства в зоне детектирования (сек.)'
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
					{ Header: 'Средняя задержка', accessor: 'avgDelay' },
				]}
				data={data}
				rowsCount={tableRows}
				status={status}
			/>
		</DataContainer>
	)
}
