import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import styles from './Header.module.scss'

const Header = () => {
	// const navigate = useNavigate()
	const [showUserMenu, setShowUserMenu] = useState(false)

	const { setUser } = useActions()

	const handleLogout = () => {
		setUser({
			user: null,
			accessToken: null,
		})
	}

	const handleShowUserMenu = () => {
		setShowUserMenu(!showUserMenu)
	}

	return (
		<div className={styles.header}>
			<Link to='/'>
				<img
					className={styles.logo}
					src='/assets/logo.svg'
					alt='Logo'
				/>
			</Link>
			<div className={styles.user}>
				<img
					onClick={handleShowUserMenu}
					src='/assets/user.png'
					alt='Avatar'
				/>
				{showUserMenu && (
					<div className={styles.userMenu}>
						<Link onClick={handleLogout} to='/login'>
							Выход
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default Header
