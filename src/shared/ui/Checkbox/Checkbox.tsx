import { InputHTMLAttributes, useRef } from 'react'
import { Text } from '../Text/Text'
import { HStack } from '../Stack/HStack/HStack'

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
		<HStack gap='8'>
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
