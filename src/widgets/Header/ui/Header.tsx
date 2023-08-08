import { HStack } from 'shared/ui/Stack/HStack/HStack'
import styles from './Header.module.scss'
import { User } from 'entities/User'

export const Header = () => {
	return (
		<HStack className={styles.header} align='center' justify='between'>
			<img className={styles.logo} src='/assets/logo.svg' alt='Logo' />
			<User />
		</HStack>
	)
}
