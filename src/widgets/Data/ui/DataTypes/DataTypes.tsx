import { Table } from 'entities/Table'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { typesActions } from '../../model/slices/typesSlice'
import dayjs from 'dayjs'
import { SearchTypes } from 'features/Search'
import DataContainer from '../common/DataContainer/DataContainer'
import { useEffect } from 'react'
import { fetchTypes } from '../../model/api/fetchTypes'

export const DataTypes = () => {
	const { data, status, tableRows, blockFetching } = useTypedSelector(state => state.types)
	const { markupConfig } = useTypedSelector(state => state.markup)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (blockFetching) {
			return
		}
		dispatch(fetchTypes())
		const interval = setInterval(() => {
			dispatch(fetchTypes())
		}, 15 * 1000)

		return () => clearInterval(interval)
	}, [dispatch, blockFetching])

	return (
		<DataContainer
			onChangeRowsCount={value => dispatch(typesActions.setTableRows(value))}
			searchForm={<SearchTypes />}
			title='Распознанные ГРЗ и классифицированные ТС'
			tooltipId='types'
			tooltipText='Список всех распознанных ГРЗ и соответствующих типов ТС по направлениям и полосам'
		>
			<Table
				columns={[
					{
						Header: 'Время',
						id: 'timestamp',
						accessor: (d: any) => {
							return dayjs(d.timestamp).format('DD-MM-YY HH:mm:ss')
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
						Header: 'Марка',
						accessor: 'vehicle_make',
					},
					{
						Header: 'Цвет',
						accessor: 'color',
					},
					{
						Header: 'Направление',
						accessor: (d: any) => {
							return markupConfig?.zone.directs[d.direction - 1]?.name || 'Не определено'
						},
					},
					{
						Header: 'Полоса',
						accessor: (d: any) => {
							return (
								markupConfig?.zone.directs[d.direction - 1]?.lines[d.line - 1]?.name || 'Не определено'
							)
						},
					},
				]}
				data={data}
				rowsCount={tableRows}
				status={status}
			/>
		</DataContainer>
	)
}
