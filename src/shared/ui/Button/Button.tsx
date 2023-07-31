import { FC, ReactNode } from 'react'
import styles from './Button.module.scss'

interface IButton {
	children: ReactNode
	onClick?: () => void
	type?: 'primary' | 'secondary' | 'danger' | 'transparent'
	size?: 'small' | 'normal' | 'big' | 'rounded'
	disabled?: boolean
}

const Button: FC<IButton> = ({
	children,
	onClick,
	type = 'primary',
	size = 'normal',
	disabled = false,
}) => {
	return (
		<button
			className={`${styles.button} ${styles[type]} ${styles[size]}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default Button
