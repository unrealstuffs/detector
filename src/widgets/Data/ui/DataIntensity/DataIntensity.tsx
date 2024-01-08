import { useEffect } from 'react'
import { Table } from 'entities/Table'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import dayjs from 'dayjs'
import DataContainer from '../common/DataContainer/DataContainer'
import { intensityActions } from '../../model/slices/intensitySlice'
import { SearchIntensity } from 'features/Search/ui/SearchIntensity/SearchIntensity'
import { fetchIntensity } from '../../model/api/fetchIntensity'

export const DataIntensity = () => {
	const { data, status, tableRows, blockFetching } = useTypedSelector(state => state.intensity)
	const { markupConfig } = useTypedSelector(state => state.markup)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (blockFetching) {
			return
		}
		dispatch(fetchIntensity())
		const interval = setInterval(() => {
			dispatch(fetchIntensity())
		}, 15 * 60 * 1000)

		return () => clearInterval(interval)
	}, [dispatch, blockFetching])

	return (
		<DataContainer
			onChangeRowsCount={value => dispatch(intensityActions.setTableRows(value))}
			searchForm={<SearchIntensity />}
			title='Интенсивность дорожного движения'
			tooltipId='intensity'
			tooltipText='Количество транспортных средств,
проходящих за один час в определенном направлении и полосе (авто/час)'
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
					{ Header: 'Интенсивность', accessor: 'intensity' },
				]}
				data={data}
				rowsCount={tableRows}
				status={status}
			/>
		</DataContainer>
	)
}
