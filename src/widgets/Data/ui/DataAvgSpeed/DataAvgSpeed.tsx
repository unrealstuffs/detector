import { Table } from 'entities/Table'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import dayjs from 'dayjs'
import DataContainer from '../common/DataContainer/DataContainer'
import { avgSpeedActions } from 'widgets/Data/model/slices/avgSpeedSlice'
import { SearchAvgSpeed } from 'features/Search'

export const DataAvgSpeed = () => {
	const { data, status, tableRows } = useTypedSelector(
		state => state.avgSpeed
	)
	const { configuration } = useTypedSelector(state => state.markup)
	const dispatch = useAppDispatch()

	return (
		<DataContainer
			onChangeRowsCount={value =>
				dispatch(avgSpeedActions.setTableRows(value))
			}
			searchForm={<SearchAvgSpeed />}
			title='Средняя скорость движения ТС'
			tooltipId='speed'
			tooltipText='Среднее арифметическое значений скоростей движения транспортных средств, проследовавших в одном
направлении по определенной полосе (км/час)'
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
				data={data}
				rowsCount={tableRows}
				status={status}
			/>
		</DataContainer>
	)
}
