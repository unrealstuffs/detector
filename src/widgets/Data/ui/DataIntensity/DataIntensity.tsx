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
	const { data, status, tableRows, blockFetching } = useTypedSelector(
		state => state.intensity
	)
	const { configuration } = useTypedSelector(state => state.markup)
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
			onChangeRowsCount={value =>
				dispatch(intensityActions.setTableRows(value))
			}
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
				data={data}
				rowsCount={tableRows}
				status={status}
			/>
		</DataContainer>
	)
}
