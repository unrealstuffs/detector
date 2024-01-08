import React, { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react'
import cls from './Input.module.scss'
import { classNames, Mods } from 'shared/lib/classNames'
import { Text } from '../Text/Text'
import { VStack } from '../Stack/VStack/VStack'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly' | 'size'>

type InputSize = 's' | 'm'

interface InputProps extends HTMLInputProps {
	className?: string
	value?: string | number
	label?: string
	onChange?: (value: string) => void
	autofocus?: boolean
	readonly?: boolean
	size?: InputSize
	isError?: boolean
	fullWidth?: boolean
}

export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		onChange,
		type = 'text',
		placeholder,
		autofocus,
		readonly,
		label,
		size = 'm',
		isError,
		fullWidth = false,
		...otherProps
	} = props
	const ref = useRef<HTMLInputElement>(null)
	const [isFocused, setIsFocused] = useState(false)

	useEffect(() => {
		if (autofocus) {
			setIsFocused(true)
			ref.current?.focus()
		}
	}, [autofocus])

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value)
	}

	const onBlur = () => {
		setIsFocused(false)
	}

	const onFocus = () => {
		setIsFocused(true)
	}

	const mods: Mods = {
		[cls.focused]: isFocused,
		[cls.error]: isError,
	}

	const input = (
		<input
			ref={ref}
			type={type}
			value={value}
			onChange={onChangeHandler}
			className={classNames(cls.Input, mods, [className, cls[size]])}
			onFocus={onFocus}
			onBlur={onBlur}
			readOnly={readonly}
			placeholder={placeholder}
			{...otherProps}
		/>
	)

	if (label) {
		return (
			<VStack max={fullWidth} gap='8'>
				<Text text={label} bold size='s' />
				{input}
			</VStack>
		)
	}

	return input
})
