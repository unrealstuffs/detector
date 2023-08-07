import styles from './Header.module.scss'
import { User } from 'entities/User'

export const Header = () => {
	return (
		<div className={styles.header}>
			<img className={styles.logo} src='/assets/logo.svg' alt='Logo' />
			<User />
		</div>
	)
}
