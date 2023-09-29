import { classNames } from 'shared/lib/classNames'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import Button from 'shared/ui/Button/Button'
import { sendDatabaseConfig } from '../model/services/sendDatabaseConfig'
import { databaseActions } from '../model/slices/databaseSlice'
import cls from './SendDbConfig.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { toast } from 'react-hot-toast'

interface SendDbConfigProps {
	className?: string
}

export const SendDbConfig = (props: SendDbConfigProps) => {
	const { className } = props
	const { databaseConfig, status } = useTypedSelector(state => state.database)

	const dispatch = useAppDispatch()

	const sendDatabaseConfigHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		
		const resultAction = await dispatch(sendDatabaseConfig())

		if (sendDatabaseConfig.fulfilled.match(resultAction)) {
			toast.success('Подключено!')
		} else {
			toast.error(`Ошибка подключения: ${resultAction.payload}`)
		}
	}

	return (
		<div className={classNames(cls.config, {}, [className])}>
			<form onSubmit={sendDatabaseConfigHandler}>

			
			<div className={cls.dbFields}>
				<div className={cls.dbName}>
					<Input
					required
						label='Имя удаленной БД'
						type='text'
						value={databaseConfig.remote_db_name}
						onChange={value => {
							dispatch(databaseActions.setDbName(value))
						}}
					/>
				</div>
				<div className={cls.dbAddress}>
					<Input
					required
						label='Адрес локальной БД'
						type='text'
						value={databaseConfig.local_db_address}
						onChange={value => {
							dispatch(databaseActions.setLocalAddress(value))
						}}
					/>
				</div>
				<div className={cls.dbPort}>
					<Input
					required
						label='Порт локальной БД'
						type='number'
						value={databaseConfig.local_db_port}
						onChange={value => {
							dispatch(databaseActions.setLocalPort(value))
						}}
					/>
				</div>
				<div className={cls.dbAddress}>
					<Input
					required
						label='Адрес удаленной БД'
						type='text'
						value={databaseConfig.remote_db_address}
						onChange={value => {
							dispatch(databaseActions.setRemoteAddress(value))
						}}
					/>
				</div>
				<div className={cls.dbPort}>
					<Input
					required
						label='Порт удаленной БД'
						type='number'
						value={databaseConfig.remote_db_port}
						onChange={value => {
							dispatch(databaseActions.setRemotePort(value))
						}}
					/>
				</div>
				<div className={cls.dbUser}>
					<Input
					required
						label='Логин'
						type='text'
						value={databaseConfig.remote_db_username}
						onChange={value => {
							dispatch(databaseActions.setUsername(value))
						}}
					/>
				</div>
				<div className={cls.dbPassword}>
					<Input
					required
						className={cls.dbPassword}
						label='Пароль'
						type='password'
						value={databaseConfig.remote_db_password}
						onChange={value => {
							dispatch(databaseActions.setPassword(value))
						}}
					/>
				</div>
			</div>
			<Button
				disabled={status === 'loading'}
				
				size='l'
				type='submit'
			>
				Сохранить
			</Button>
			</form>
		</div>
	)
}
