import styles from './Table.module.scss'
import { FC } from 'react'
import { useTable, useSortBy, Column } from 'react-table'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin'
import DatePicker from './DatePicker'

interface Props {
	columns: Array<Column<object>>
	data: Array<object>
}

const CustomInput = ({ value, defaultValue, inputRef, ...props }: any) => {
	return (
		<input
			{...props}
			defaultValue={defaultValue}
			ref={inputRef}
			className={styles.dateInput}
		/>
	)
}

const Table: FC<Props> = ({ columns, data }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data,
			},
			useSortBy
		)

	const pageRows = rows.slice(0, 20)

	return (
		<>
			<div className={styles.datePicker}>
				<DatePicker
					options={{
						dateFormat: 'd/m/Y H-i',
						defaultDate: '',
						disableMobile: 'true',
						enableTime: true,
						locale: Russian,
					}}
					fromDateID='DashboardEndDatePickera'
					selectValue={[]}
					placeholder='От'
				/>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<input
					id='DashboardEndDatePickera'
					placeholder='До'
					className={styles.dateInput}
				/>
			</div>
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
										<td {...cell.getCellProps()}>
											{cell.render('Cell')}
										</td>
									)
								})}
							</tr>
						)
					})}
					{!rows.length && (
						<tr>
							<td colSpan={columns.length}>Нет данных...</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	)
}

export default Table
