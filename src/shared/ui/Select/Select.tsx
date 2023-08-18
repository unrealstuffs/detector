import { SelectHTMLAttributes, ChangeEvent, memo } from 'react'
import cls from './Select.module.scss'
import { classNames } from 'shared/lib/classNames'

type HTMLSelectProps = Omit<
	SelectHTMLAttributes<HTMLSelectElement>,
	'value' | 'onChange' | 'size'
>

interface SelectProps extends HTMLSelectProps {
	className?: string
	options: { value: string; title: string }[]
	onChange?: (value: string) => void
}

const Select = memo((props: SelectProps) => {
	const { onChange, options, className } = props

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value)
	}

	return (
		<select
			className={classNames(cls.Select, {}, [className])}
			onChange={onChangeHandler}
		>
			{options.map(item => (
				<option key={item.value} value={item.value}>
					{item.title}
				</option>
			))}
		</select>
	)
})

export default Select
