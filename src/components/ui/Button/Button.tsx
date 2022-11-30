import { FC, ReactNode } from 'react'
import styles from './Button.module.scss'

const Button: FC<{ children: ReactNode; onClick?: () => void }> = ({
	children,
	onClick,
}) => {
	return (
		<button className={styles.button} onClick={onClick} type='submit'>
			{children}
		</button>
	)
}

export default Button
