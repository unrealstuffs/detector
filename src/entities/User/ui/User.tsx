import { Link } from 'react-router-dom'
import cls from './User.module.scss'
import { useState } from 'react'
import { userActions } from '../model/slices/userSlice'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

export const User = () => {
	const [showUserMenu, setShowUserMenu] = useState(false)
	const dispatch = useAppDispatch()

	const handleLogout = () => {
		dispatch(userActions.logout())
	}

	const handleShowUserMenu = () => {
		setShowUserMenu(!showUserMenu)
	}

	return (
		<div className={cls.user}>
			<img
				onClick={handleShowUserMenu}
				src='/assets/user.png'
				alt='Avatar'
			/>
			{showUserMenu && (
				<div className={cls.userMenu}>
					<Link onClick={handleLogout} to='/login'>
						Выход
					</Link>
				</div>
			)}
		</div>
	)
}
