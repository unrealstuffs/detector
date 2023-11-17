import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import cls from './Button.module.scss'
import { classNames } from 'shared/lib/classNames'

export type ButtonColor = 'primary' | 'danger' | 'transparent' | 'light' | 'outline'
export type ButtonSize = 's' | 'm' | 'l'
export type ButtonVariant = 'normal' | 'squared'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	size?: ButtonSize
	disabled?: boolean
	children?: ReactNode
	color?: ButtonColor
	variant?: ButtonVariant
}

const Button: FC<ButtonProps> = props => {
	const { className, size = 'm', disabled, children, color = 'primary', variant = 'normal', ...otherProps } = props

	return (
		<button
			type='button'
			className={classNames(cls.Button, {}, [className, cls[size], cls[color], cls[variant]])}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	)
}

export default Button
