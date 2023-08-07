import { useState } from 'react'
import cls from './LoginByUsername.module.scss'
import Button from 'shared/ui/Button/Button'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loginByUsername } from '../model/services/loginByUsername'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { Text } from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import { classNames } from 'shared/lib/classNames'
import { useNavigate } from 'react-router-dom'

interface LoginByUsernameProps {
	className?: string
}

export const LoginByUsername = (props: LoginByUsernameProps) => {
	const { className } = props
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const { status } = useTypedSelector(state => state.user)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	return (
		<div className={classNames(cls.loginForm, {}, [className])}>
			<Text title='Вход' bold size='l' className={cls.heading} />
			<form
				onSubmit={e => {
					e.preventDefault()
					dispatch(loginByUsername({ login, password })).then(() => {
						navigate('/')
					})
				}}
			>
				<Input
					autoFocus
					label='Логин'
					value={login}
					required
					className={cls.input}
					onChange={value => setLogin(value)}
				/>
				<Input
					label='Пароль'
					type='password'
					value={password}
					required
					className={cls.input}
					onChange={value => setPassword(value)}
				/>

				{status === 'error' && (
					<Text
						text='Неверный логин или пароль'
						align='center'
						variant='danger'
						bold
						className={cls.errorMessage}
					/>
				)}

				<div className={cls.loginActions}>
					<Button
						size='l'
						disabled={status === 'loading'}
						type='submit'
					>
						{(status === 'init' || status === 'error') && 'Войти'}
						{status === 'loading' && 'Загрузка...'}
					</Button>
				</div>
			</form>
		</div>
	)
}
