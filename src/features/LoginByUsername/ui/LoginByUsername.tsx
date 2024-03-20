import { FormEvent } from 'react'
import cls from './LoginByUsername.module.scss'
import Button from 'shared/ui/Button/Button'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { loginByUsername } from '../model/services/loginByUsername'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { Text } from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import { classNames } from 'shared/lib/classNames'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { userActions } from 'entities/User'

interface LoginByUsernameProps {
	className?: string
}

export const LoginByUsername = (props: LoginByUsernameProps) => {
	const { className } = props
	const { status, login, password } = useTypedSelector(state => state.user)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const loginByUsernameHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const result = await dispatch(loginByUsername({ login, password }))
		if (loginByUsername.fulfilled.match(result)) {
			navigate('/')
		} else {
			if (result.payload) {
				toast.error(`Ошибка входа: ${result.payload}`)
			}
		}
	}

	return (
		<div className={classNames(cls.loginForm, {}, [className])}>
			<Text title='Вход' bold size='l' className={cls.heading} />
			<form onSubmit={loginByUsernameHandler}>
				<Input
					autoFocus
					label='Логин'
					value={login}
					required
					className={cls.input}
					onChange={value => dispatch(userActions.setLogin(value))}
				/>
				<Input
					label='Пароль'
					type='password'
					value={password}
					required
					className={cls.input}
					onChange={value => dispatch(userActions.setPassword(value))}
				/>

				<div className={cls.loginActions}>
					<Button size='l' disabled={status === 'loading'} type='submit'>
						Войти
					</Button>
				</div>
			</form>
		</div>
	)
}
