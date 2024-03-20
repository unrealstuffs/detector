import React, { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react'
import cls from './Input.module.scss'
import { classNames, Mods } from 'shared/lib/classNames'
import { Text } from '../Text/Text'
import { VStack } from '../Stack/VStack/VStack'
import { HStack } from '../Stack/HStack/HStack'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

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
	required?: boolean
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
		required = false,
		...otherProps
	} = props
	const ref = useRef<HTMLInputElement>(null)
	const [isFocused, setIsFocused] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

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

	let input = (
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
			required={required}
			{...otherProps}
		/>
	)

	if (type === 'password') {
		input = (
			<div className={cls.container}>
				<input
					ref={ref}
					type={showPassword ? 'text' : 'password'}
					value={value}
					onChange={onChangeHandler}
					className={classNames(cls.Input, mods, [className, cls[size]])}
					onFocus={onFocus}
					onBlur={onBlur}
					readOnly={readonly}
					placeholder={placeholder}
					required={required}
					{...otherProps}
				/>
				{showPassword ? (
					<AiOutlineEye className={cls.passwordEye} onClick={() => setShowPassword(!showPassword)} />
				) : (
					<AiOutlineEyeInvisible className={cls.passwordEye} onClick={() => setShowPassword(!showPassword)} />
				)}
			</div>
		)
	}

	if (label) {
		return (
			<VStack max={fullWidth} gap='8'>
				<HStack gap='4'>
					<Text text={label} bold size='s' />
					{required && <span className={cls.required}>*</span>}
				</HStack>
				{input}
			</VStack>
		)
	}

	return input
})
