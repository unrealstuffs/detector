import Flatpickr from 'react-flatpickr'
import { classNames } from 'shared/lib/classNames'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import cls from './DatePickers.module.scss'
import { flatpickrOptions } from '../../../model/consts/flatpickrOptions'
import { forwardRef, useRef, useImperativeHandle } from 'react'
import Button from 'shared/ui/Button/Button'

interface DatePickerProps {
	className?: string
	defaultDateFrom: string | Date
	defaultDateTo: string | Date
	setTimestampFrom: (date: Date | string) => void
	setTimestampTo: (date: Date | string) => void
	searchHandler: () => void
	resetSearchHandler: () => void
}

const DatePickers = forwardRef((props: DatePickerProps, ref) => {
	const {
		defaultDateFrom,
		defaultDateTo,
		setTimestampFrom,
		setTimestampTo,
		className,
		resetSearchHandler,
		searchHandler,
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
			className={classNames(cls.DatePickers, {}, [className])}
		>
			<Flatpickr
				ref={fromSearchRef}
				options={{
					...flatpickrOptions,
					defaultDate: defaultDateFrom,
				}}
				placeholder='От'
				className={cls.input}
				onChange={selectedDate => setTimestampFrom(selectedDate[0])}
			/>
			<Flatpickr
				ref={toSearchRef}
				options={{
					...flatpickrOptions,
					defaultDate: defaultDateTo,
					minDate: defaultDateFrom,
				}}
				placeholder='До'
				className={cls.input}
				onChange={selectedDate => setTimestampTo(selectedDate[0])}
			/>
			<Button size='m' color='danger' onClick={resetSearchHandler}>
				Сброс
			</Button>
			<Button size='m' onClick={searchHandler}>
				Поиск
			</Button>
		</HStack>
	)
})

export default DatePickers
