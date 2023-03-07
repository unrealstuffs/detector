import Flatpickr from 'react-flatpickr'
import { Tooltip } from 'react-tooltip'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import 'flatpickr/dist/themes/dark.css'
import 'react-tooltip/dist/react-tooltip.css'

import styles from './DataBlock.module.scss'
import { AiOutlineCloseCircle, AiOutlineQuestionCircle } from 'react-icons/ai'
import Table from '../Table/Table'
import { FC, useEffect, useRef, useState } from 'react'
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
	const secondSearchRef = useRef<Flatpickr>(null)
	const { accessToken } = useTypedSelector(state => state.user)
	const { setSearchFor, resetSearchFor } = useActions()

	const [dates, setDates] = useState<{
		from: Date[] | null
		to: Date[] | null
	}>({
		from: null,
		to: null,
	})

	const resetSearch = () => {
		if (!searchRef?.current?.flatpickr) return
		if (!secondSearchRef?.current?.flatpickr) return
		searchRef.current!.flatpickr.clear()
		secondSearchRef.current!.flatpickr.clear()

		setDates({ from: null, to: null })

		resetSearchFor(tableName)

		//@ts-ignore
		setData(prev => ({
			...prev,
			[tableName]: [],
		}))
	}

	useEffect(() => {
		sendSearchDates()
	}, [dates])

	const sendSearchDates = async () => {
		if (!dates.from || !dates.to) {
			return
		}
		let url = ''

		setSearchFor(tableName)

		switch (tableName) {
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

		console.log(
			JSON.stringify({
				from: dates.from[0].toISOString(),
				to: dates.to[0].toISOString(),
			})
		)

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `${accessToken}`,
			},
			body: JSON.stringify({ from: dates.from[0], to: dates.to[0] }),
		})

		const responseData = await response.json()

		//@ts-ignore
		setData(prev => ({
			...prev,
			[tableName]: [],
		}))
		//@ts-ignore
		setData(prev => ({
			...prev,
			[tableName]: JSON.parse(responseData.data || []),
		}))
	}

	return (
		<div className={styles.dataBlock}>
			<div className={styles.dataHeader}>
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
				style={{ maxWidth: 300 }}
			/>
			<div className={styles.dateRow}>
				<div className={styles.datePicker}>
					<Flatpickr
						ref={searchRef}
						options={{
							dateFormat: 'd-m-Y H:i',
							defaultDate: '',
							disableMobile: true,
							enableTime: true,
							locale: Russian,
							maxDate: 'today',
							minuteIncrement: 1,
						}}
						placeholder='От'
						className={styles.dateInput}
						onClose={selectedDate =>
							setDates({
								from: selectedDate,
								to: dates.to,
							})
						}
					/>
					<Flatpickr
						ref={secondSearchRef}
						options={{
							dateFormat: 'd-m-Y H:i',
							defaultDate: '',
							disableMobile: true,
							enableTime: true,
							locale: Russian,
							maxDate: 'today',
							minuteIncrement: 1,
						}}
						placeholder='До'
						className={styles.dateInput}
						onClose={selectedDate =>
							setDates({
								from: dates.from,
								to: selectedDate,
							})
						}
					/>
				</div>
				<AiOutlineCloseCircle
					size={30}
					className={styles.deleteIcon}
					onClick={() => resetSearch()}
				/>
			</div>
			<Table columns={columns || []} data={data || []} />
		</div>
	)
}

export default DataBlock
