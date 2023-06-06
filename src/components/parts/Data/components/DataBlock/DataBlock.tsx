import { Tooltip } from 'react-tooltip'
import { useState } from 'react'
import styles from './DataBlock.module.scss'
import {
	AiOutlineCaretDown,
	AiOutlineCaretRight,
	AiOutlineQuestionCircle,
	AiOutlineSearch,
} from 'react-icons/ai'
import { FC } from 'react'
import { DataState } from '../../../../../types/Data'
import { Fetch } from '../../../../../types/Fetch'
import Search from '../Search/Search'
import Table from '../Table/Table'

interface DataBlockProps {
	data: any
	columns: any[]
	tableName: string
	header: string
	tooltipText: string
	setData: (state: DataState) => void
}

const DataBlock: FC<DataBlockProps> = ({
	data,
	columns,
	tableName,
	header,
	tooltipText,
	setData,
}) => {
	const [showTable, setShowTable] = useState(true)
	const [showForm, setShowForm] = useState(false)
	const [rowsCount, setRowsCount] = useState(30)
	const [status, setStatus] = useState<Fetch>('init')

	return (
		<div className={styles.dataBlock}>
			<div
				className={styles.dataHeader}
				onClick={() => {
					setShowTable(!showTable)
					setShowForm(false)
				}}
			>
				{showTable ? (
					<AiOutlineCaretDown size={20} />
				) : (
					<AiOutlineCaretRight size={20} />
				)}
				{header}{' '}
				<AiOutlineQuestionCircle
					className={styles.icon}
					size={23}
					id={`tooltip-${tableName}`}
				/>
			</div>
			<Tooltip
				anchorSelect={`#tooltip-${tableName}`}
				place='bottom'
				content={tooltipText}
				style={{ maxWidth: 400 }}
			/>
			{showTable && (
				<>
					<div className={styles.searchIcon}>
						<select
							className={styles.select}
							onChange={e => setRowsCount(+e.target.value)}
						>
							<option value='30' selected>
								Показывать по
							</option>
							<option value='10'>10 записей</option>
							<option value='30'>30 записей</option>
							<option value='50'>50 записей</option>
							<option value='70'>70 записей</option>
							<option value='100'>100 записей</option>
						</select>
						<AiOutlineSearch
							size={20}
							className={showForm ? 'text-accent' : 'text-dark'}
							onClick={() => setShowForm(!showForm)}
							style={{ cursor: 'pointer' }}
						/>
					</div>
					{showForm && (
						<Search
							tableName={tableName}
							setData={setData}
							setStatus={setStatus}
						/>
					)}
					<Table
						columns={columns || []}
						data={data || []}
						rowsCount={rowsCount}
						status={status}
					/>
				</>
			)}
		</div>
	)
}

export default DataBlock
