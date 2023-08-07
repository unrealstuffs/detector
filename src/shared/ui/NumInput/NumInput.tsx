import {
	AiOutlineDoubleLeft,
	AiOutlineDoubleRight,
	AiOutlineLeft,
	AiOutlineRight,
} from 'react-icons/ai'
import { InputHTMLAttributes } from 'react'

import cls from './NumInput.module.scss'
import { classNames } from 'shared/lib/classNames'
import { HStack } from '../Stack/HStack/HStack'
import { Text } from '../Text/Text'

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
		<div className={classNames(cls.numInput, {}, [className])}>
			<button onClick={handleBigDecrement}>
				<AiOutlineDoubleLeft />
			</button>
			<button onClick={handleDecrement}>
				<AiOutlineLeft />
			</button>
			<input
				type='text'
				max={max}
				min={min}
				value={value}
				onChange={e => {
					if (isNaN(+e.target.value)) {
						onChange(0)
						return
					}
					if (+e.target.value < min) {
						onChange(min)
						return
					}
					if (+e.target.value > max) {
						onChange(max)
						return
					}
					onChange(+e.target.value)
				}}
			/>
			<button onClick={handleIncrement}>
				<AiOutlineRight />
			</button>
			<button onClick={handleBigIncrement}>
				<AiOutlineDoubleRight />
			</button>
		</div>
	)

	if (label) {
		return (
			<HStack max gap='8'>
				<Text text={label} />
				{input}
			</HStack>
		)
	}

	return input
}

export default NumInput
