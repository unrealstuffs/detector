import styles from './Table.module.scss'
import { FC } from 'react'
import { useTable, useSortBy, Column } from 'react-table'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import 'flatpickr/dist/themes/material_blue.css'
import { Fetch } from '../../../types/Fetch'

interface Props {
	columns: Array<Column<object>>
	data: Array<object>
	rowsCount: number
	status: Fetch
}

const Table: FC<Props> = ({ columns, data, rowsCount, status }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data,
			},
			useSortBy
		)

	const pageRows = rows.slice(0, rowsCount)

	return (
		<table {...getTableProps()} className={styles.table}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th
								{...column.getHeaderProps(
									column.getSortByToggleProps()
								)}
							>
								{column.render('Header')}
								<span>
									{column.isSorted ? (
										column.isSortedDesc ? (
											<AiOutlineCaretDown
												size={10}
												className={styles.icon}
											/>
										) : (
											<AiOutlineCaretUp
												size={10}
												className={styles.icon}
											/>
										)
									) : (
										''
									)}
								</span>
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{pageRows.map((row, i) => {
					prepareRow(row)
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
								return (
									<td
										{...cell.getCellProps()}
										className={
											cell.value
												? 'text-dark'
												: 'text-light'
										}
									>
										{cell.value
											? cell.render('Cell')
											: 'Не опознано'}
									</td>
								)
							})}
						</tr>
					)
				})}
				{status !== 'success' && !pageRows.length && (
					<tr>
						<td
							colSpan={columns.length}
							style={{ textAlign: 'center' }}
						>
							{status === 'init' && 'Нет данных'}
							{status === 'error' && 'Ошибка сервера'}
							{status === 'loading' && 'Загрузка'}
							{status === 'nodata' && 'Не найдено'}
						</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}

export default Table
