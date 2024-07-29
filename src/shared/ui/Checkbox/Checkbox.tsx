import { InputHTMLAttributes, useRef } from 'react'
import { Text } from '../Text/Text'
import { classNames } from 'shared/lib/classNames'
import cls from './Checkbox.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

interface CheckboxProps extends HTMLInputProps {
	className?: string
	reverse?: boolean
	label: string
	onChange?: (value: boolean) => void
}

const Checkbox = (props: CheckboxProps) => {
	const { label, className, onChange, reverse = false, ...otherProps } = props
	const ref = useRef<HTMLInputElement>(null)

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.checked)
	}

	return (
		<label className={classNames(cls.Checkbox, { [cls.reverse]: reverse }, [className])}>
			<input className={cls.input} ref={ref} type='checkbox' onChange={onChangeHandler} {...otherProps} />
			<span className={cls.track}>
				<span className={cls.thumb} />
			</span>
			<Text bold size='s' text={label} />
		</label>
	)
}

export default Checkbox
