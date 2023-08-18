import {
	AiOutlineDoubleLeft,
	AiOutlineDoubleRight,
	AiOutlineLeft,
	AiOutlineRight,
} from 'react-icons/ai'
import { InputHTMLAttributes } from 'react'

import cls from './NumInput.module.scss'
import { classNames } from 'shared/lib/classNames'
import { Text } from '../Text/Text'
import { Input } from '../Input/Input'
import { VStack } from '../Stack/VStack/VStack'
import { HStack } from '../Stack/HStack/HStack'

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'readOnly' | 'size'
>

interface NumInputProps extends HTMLInputProps {
	className?: string
	label?: string
	value: number
	max: number
	min: number
	increment: number
	bigIncrement: number
	onChange: (value: number) => void
}

const NumInput = (props: NumInputProps) => {
	const {
		value,
		max,
		min,
		increment,
		bigIncrement,
		onChange,
		className,
		label,
	} = props
	const handleIncrement = () => {
		if (value <= max - increment) onChange(value + increment)
	}

	const handleBigIncrement = () => {
		if (value <= max - bigIncrement) onChange(value + bigIncrement)
	}

	const handleDecrement = () => {
		if (value >= min + increment) onChange(value - increment)
	}
	const handleBigDecrement = () => {
		if (value >= min + bigIncrement) onChange(value - bigIncrement)
	}

	const input = (
		<HStack
			align='center'
			gap='8'
			className={classNames(cls.numInput, {}, [className])}
		>
			<AiOutlineDoubleLeft
				onClick={handleBigDecrement}
				className={cls.icon}
			/>
			<AiOutlineLeft onClick={handleDecrement} className={cls.icon} />
			<Input
				type='text'
				max={max}
				min={min}
				value={value}
				onChange={value => {
					if (isNaN(+value)) {
						onChange(0)
						return
					}
					if (+value < min) {
						onChange(min)
						return
					}
					if (+value > max) {
						onChange(max)
						return
					}
					onChange(+value)
				}}
			/>
			<AiOutlineRight onClick={handleIncrement} className={cls.icon} />
			<AiOutlineDoubleRight
				onClick={handleBigIncrement}
				className={cls.icon}
			/>
		</HStack>
	)

	if (label) {
		return (
			<VStack max gap='8'>
				<Text text={label} bold size='s' />
				{input}
			</VStack>
		)
	}

	return input
}

export default NumInput
