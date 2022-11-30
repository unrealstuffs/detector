import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Login from '../components/parts/Login/Login'
import Background from '../components/ui/Background/Background'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

const LoginScreen = () => {
	const navigate = useNavigate()
	const [error, setError] = useState('')

	const { setUser } = useActions()
	const { accessToken } = useTypedSelector(state => state.user)

	const submit = async (login: string, password: string) => {
		setError('')
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
			navigate('/')
		} else {
			setError('Неверный логин или пароль')
			setTimeout(() => {
				setError('')
			}, 4000)
		}
	}

	return (
		<>
			{accessToken && <Navigate to='/' replace={true} />}
			<Background>
				<Login submit={submit} loginError={error} />
			</Background>
		</>
	)
}

export default LoginScreen
