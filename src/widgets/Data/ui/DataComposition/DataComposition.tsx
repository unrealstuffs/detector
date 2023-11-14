import { useEffect } from 'react'
import { Table } from 'entities/Table'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import dayjs from 'dayjs'
import { compositionActions } from '../../model/slices/compositionSlice'
import { SearchComposition } from 'features/Search/ui/SearchComposition/SearchComposition'
import DataContainer from '../common/DataContainer/DataContainer'
import { fetchComposition } from '../../model/api/fetchComposition'

export const DataComposition = () => {
	const { data, status, tableRows, blockFetching } = useTypedSelector(state => state.composition)
	const { markupConfig } = useTypedSelector(state => state.markup)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (blockFetching) {
			return
		}
		dispatch(fetchComposition())
		const interval = setInterval(() => {
			dispatch(fetchComposition())
		}, 15 * 60 * 1000)

		return () => clearInterval(interval)
	}, [dispatch, blockFetching])

	return (
		<DataContainer
			onChangeRowsCount={value => dispatch(compositionActions.setTableRows(value))}
			searchForm={<SearchComposition />}
			title='Состав транспортных средств'
			tooltipId='composition'
			tooltipText='Количество транспортных средств каждой расчетной категории (европейской классификации транспортного потока EUR 6), проследовавших за одну минуту в определенном направлении и полосе (ед.). Интервал разбиения указывает, с каким периодом нужно запрашивать данные, при указании 0 или пустого поля, будет выведена суммарная информация за запрашиваемый период времени.'
		>
			<Table
				columns={[
					{
						id: 'timestampRange',
						Header: 'Время',
						accessor: (d: any) => {
							if (d.timestampRange) {
								return `${dayjs(d.timestampRange.from).format('DD-MM-YY HH:mm:ss')} \n ${dayjs(
									d.timestampRange.to
								).format('DD-MM-YY HH:mm:ss')}`
							}
							return dayjs(d.timestamp).format('DD-MM-YY HH:mm:ss')
						},
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
					{
						Header: 'Тип ТС',
						accessor: 'vehicleType',
					},
					{ Header: 'Количество', accessor: 'quantity' },
				]}
				data={data}
				rowsCount={tableRows}
				status={status}
			/>
		</DataContainer>
	)
}
