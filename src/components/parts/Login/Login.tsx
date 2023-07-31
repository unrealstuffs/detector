import { useState } from 'react'
import Button from '../../ui/Button/Button'
import styles from './Login.module.scss'
import { Fetch } from '../../../types/Fetch'
import { useActions } from '../../../hooks/useActions'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [status, setStatus] = useState<Fetch>('init')
	const navigate = useNavigate()

	const { setUser } = useActions()

	const submit = async (login: string, password: string) => {
		setStatus('loading')
		try {
			const response = await fetch(`${process.env.REACT_APP_AUTH_URL}`, {
				method: 'PUT',
				body: JSON.stringify({ login, password }),
			})
			const data = await response.json()

			if (data.result === 'success') {
				setUser({
					user: data.user,
					accessToken: response.headers.get('Authorization'),
				})
				setStatus('success')
				navigate('/')
			}
		} catch {
			setStatus('error')
			setTimeout(() => {
				setStatus('init')
			}, 2000)
		}
	}

	return (
		<div className={styles.loginForm}>
			<h1>Вход</h1>
			<form
				onSubmit={e => {
					e.preventDefault()
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
				</div>

				<div className={styles.loginActions}>
					<Button
						type='primary'
						size='big'
						disabled={status === 'loading' || status === 'error'}
					>
						{status === 'init' && 'Войти'}
						{status === 'error' && 'Ошибка'}
						{status === 'loading' && 'Загрузка...'}
						{status === 'success' && 'Отправлено!'}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default Login
