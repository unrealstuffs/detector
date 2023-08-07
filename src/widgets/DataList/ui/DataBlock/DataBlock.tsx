import { Tooltip } from 'react-tooltip'
import { useState } from 'react'
import cls from './DataBlock.module.scss'
import {
	AiOutlineCaretDown,
	AiOutlineCaretRight,
	AiOutlineQuestionCircle,
	AiOutlineSearch,
} from 'react-icons/ai'
import { FetchStatus } from 'shared/types/FetchStatus'
import { TableNameType } from '../../model/types/Data'
import { classNames } from 'shared/lib/classNames'
import Select from 'shared/ui/Select/Select'
import { options } from 'widgets/DataList/model/consts/options'
import { Table } from 'entities/Table'
import { SearchData } from 'features/SearchData'

interface DataBlockProps {
	data: any
	columns: any[]
	tableName: TableNameType
	header: string
	tooltipText: string
	className?: string
}

const DataBlock = (props: DataBlockProps) => {
	const { data, columns, tableName, header, tooltipText, className } = props
	const [showTable, setShowTable] = useState(true)
	const [showForm, setShowForm] = useState(false)
	const [rowsCount, setRowsCount] = useState(30)
	const [status, setStatus] = useState<FetchStatus>('init')

	return (
		<div className={classNames(cls.DataBlock, {}, [className])}>
			<div
				className={cls.dataHeader}
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
					className={cls.icon}
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
					<div className={cls.searchIcon}>
						<Select
							options={options}
							defaultValue='30'
							className={cls.select}
							onChange={value => setRowsCount(+value)}
						/>
						<AiOutlineSearch
							size={20}
							className={showForm ? 'text-accent' : 'text-dark'}
							onClick={() => setShowForm(!showForm)}
							style={{ cursor: 'pointer' }}
						/>
					</div>
					{showForm && (
						<SearchData
							tableName={tableName}
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
