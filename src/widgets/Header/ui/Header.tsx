import { HStack } from 'shared/ui/Stack/HStack/HStack'
import cls from './Header.module.scss'
import { AiOutlineLogout } from 'react-icons/ai'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { Link } from 'react-router-dom'
import { userActions } from 'entities/User'

export const Header = () => {
	const dispatch = useAppDispatch()

	const handleLogout = () => {
		dispatch(userActions.logout())
	}

	return (
		<HStack className={cls.header} align='center' justify='between'>
			<img className={cls.logo} src='/assets/logo.svg' alt='Logo' />
			<Link onClick={handleLogout} to='/login'>
				<AiOutlineLogout className={cls.logout} title='Выход' />
			</Link>
		</HStack>
	)
}
