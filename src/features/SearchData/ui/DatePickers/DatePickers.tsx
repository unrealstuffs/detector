import Flatpickr from 'react-flatpickr'
import { classNames } from 'shared/lib/classNames'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import cls from './DatePickers.module.scss'
import { flatpickrOptions } from '../../model/consts/flatpickrOptions'
import {
	forwardRef,
	useRef,
	useImperativeHandle,
	Dispatch,
	SetStateAction,
} from 'react'
import IntervalConverter from '../IntervalConverter/IntervalConverter'
import SearchDataSchema from '../../model/types/SearchData'

interface DatePickerProps {
	className?: string
	defaultDateFrom: string | Date
	defaultDateTo: string | Date
	minDate: string | Date
	setSearchData: Dispatch<SetStateAction<SearchDataSchema>>
	tableName: string
}

const DatePickers = forwardRef((props: DatePickerProps, ref) => {
	const {
		defaultDateFrom,
		defaultDateTo,
		setSearchData,
		tableName,
		className,
		minDate,
	} = props
	const fromSearchRef = useRef<Flatpickr>(null)
	const toSearchRef = useRef<Flatpickr>(null)

	useImperativeHandle(ref, () => ({
		clear: () => {
			fromSearchRef.current?.flatpickr.clear()
			toSearchRef.current?.flatpickr.clear()
		},
	}))

	return (
		<HStack
			align='center'
			justify='between'
			gap='8'
			className={classNames(cls.datePickers, {}, [className])}
		>
			<Flatpickr
				ref={fromSearchRef}
				options={{
					...flatpickrOptions,
					defaultDate: defaultDateFrom,
				}}
				placeholder='От'
				className={classNames(cls.dateInput, {}, [cls.input])}
				onClose={selectedDate =>
					setSearchData(prev => ({
						...prev,
						timestampRange: {
							...prev.timestampRange,
							from: selectedDate[0],
						},
					}))
				}
			/>
			<Flatpickr
				ref={toSearchRef}
				options={{
					...flatpickrOptions,
					defaultDate: defaultDateTo,
					minDate,
				}}
				placeholder='До'
				className={classNames(cls.dateInput, {}, [cls.input])}
				onChange={selectedDate =>
					setSearchData(prev => ({
						...prev,
						timestampRange: {
							...prev.timestampRange,
							to: selectedDate[0],
						},
					}))
				}
			/>
			{tableName === 'composition' && (
				<IntervalConverter setSearchData={setSearchData} />
			)}
		</HStack>
	)
})

export default DatePickers
