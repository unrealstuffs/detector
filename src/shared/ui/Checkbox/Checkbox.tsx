import { InputHTMLAttributes, useRef } from 'react'
import { Text } from '../Text/Text'
import { HStack } from '../Stack/HStack/HStack'
import { classNames } from 'shared/lib/classNames'
import cls from './Checkbox.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

interface CheckboxProps extends HTMLInputProps {
	className?: string
	label: string
	onChange?: (value: boolean) => void
}

const Checkbox = (props: CheckboxProps) => {
	const { label, className, onChange, ...otherProps } = props
	const ref = useRef<HTMLInputElement>(null)

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.checked)
	}

	return (
		<HStack gap='8' className={classNames(cls.Checkbox, {}, [className])}>
			<input
				ref={ref}
				type='checkbox'
				onChange={onChangeHandler}
				{...otherProps}
			/>
			<Text bold size='s' text={label} />
		</HStack>
	)
}

export default Checkbox
