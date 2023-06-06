import { FC, useState, useEffect } from 'react'
import Button from '../../ui/Button/Button'
import styles from './Login.module.scss'

const Login: FC<{
	submit: (login: string, password: string) => void
	loginError: string
}> = ({ submit, loginError }) => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		loginError && setLoading(false)
	}, [loginError])

	return (
		<div className={styles.loginForm}>
			<h1>Вход</h1>
			<form
				onSubmit={e => {
					e.preventDefault()
					setLoading(true)
					submit(login, password)
				}}
			>
				<div className={styles.inputGroup}>
					<div className={styles.input}>
						<label htmlFor='text'>Логин</label>
						<input
							id='text'
							type='text'
							value={login}
							required
							onChange={e => setLogin(e.target.value)}
						/>
					</div>
					<div className={styles.input}>
						<label htmlFor='password'>Пароль</label>
						<input
							id='password'
							type='password'
							value={password}
							required
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					{loginError && (
						<div className={styles.error}>{loginError}</div>
					)}
				</div>

				<div className={styles.loginActions}>
					<Button type='primary' size='big'>
						Войти
					</Button>
					{loading && (
						<div className={styles.loader}>
							<img
								src='/assets/loader_bold.gif'
								alt='Loading...'
								width={30}
							/>
						</div>
					)}
				</div>
			</form>
		</div>
	)
}

export default Login
