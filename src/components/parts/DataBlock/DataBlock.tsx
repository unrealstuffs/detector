import Flatpickr from 'react-flatpickr'
import { Tooltip } from 'react-tooltip'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import 'flatpickr/dist/themes/dark.css'
import 'react-tooltip/dist/react-tooltip.css'

import styles from './DataBlock.module.scss'
import { AiOutlineCloseCircle, AiOutlineQuestionCircle } from 'react-icons/ai'
import Table from '../Table/Table'
import { FC, useRef } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { DataState } from '../../../types/Data'
import { useActions } from '../../../hooks/useActions'

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
	const searchRef = useRef<Flatpickr>(null)
	const { accessToken } = useTypedSelector(state => state.user)
	const { setSearchFor } = useActions()

	const resetSearch = () => {
		if (!searchRef?.current?.flatpickr) return
		searchRef.current!.flatpickr.clear()
		setSearchFor('')

		//@ts-ignore
		setData(prev => ({
			...prev,
			[tableName]: [],
		}))
	}

	const sendSearchDates = async (dates: Date[], table: string) => {
		if (dates.length !== 2) {
			return
		}

		let url = ''

		setSearchFor(table)

		switch (table) {
			case 'types':
				url = `${process.env.REACT_APP_SET_VEHICLE_TYPES_AND_PLATES}`
				break
			case 'intensity':
				url = `${process.env.REACT_APP_SET_TRAFFIC_INTENSITY}`
				break
			case 'composition':
				url = `${process.env.REACT_APP_SET_VEH_COMPOSITION}`
				break
			case 'speed':
				url = `${process.env.REACT_APP_SET_AVERAGE_SPEED}`
				break
			case 'delay':
				url = `${process.env.REACT_APP_SET_AVERAGE_DELAY}`
				break
			case 'density':
				url = `${process.env.REACT_APP_SET_TRAFFIC_DENSITY}`
				break
			default:
				return
		}

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `${accessToken}`,
			},
			body: JSON.stringify({ from: dates[0], to: dates[1] }),
		})

		const responseData = await response.json()

		//@ts-ignore
		setData(prev => ({
			...prev,
			[table]: [],
		}))
		//@ts-ignore
		setData(prev => ({
			...prev,
			[table]: JSON.parse(responseData.data || []),
		}))
	}

	return (
		<div className={styles.dataBlock}>
			<div className={styles.dataHeader}>
				{header}{' '}
				<AiOutlineQuestionCircle
					className={styles.icon}
					size={23}
					id={tableName}
				/>
			</div>
			<Tooltip
				anchorSelect={`#${tableName}`}
				place='bottom'
				content={tooltipText}
			/>
			<div className={styles.datePicker}>
				<Flatpickr
					ref={searchRef}
					options={{
						dateFormat: 'd-m-Y H:i',
						defaultDate: '',
						disableMobile: true,
						enableTime: true,
						locale: Russian,
						mode: 'range',
						maxDate: 'today',
						minuteIncrement: 1,
					}}
					placeholder='Временной промежуток'
					className={styles.dateInput}
					onClose={selectedDates =>
						sendSearchDates(selectedDates, tableName)
					}
				/>
				<AiOutlineCloseCircle
					size={30}
					className={styles.searchIcon}
					onClick={() => resetSearch()}
				/>
			</div>
			<Table columns={columns || []} data={data || []} />
		</div>
	)
}

export default DataBlock
