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

	const sendDatabaseConfigHandler = async () => {
		const resultAction = await dispatch(sendDatabaseConfig())

		if (sendDatabaseConfig.fulfilled.match(resultAction)) {
			toast.success('Подключено!')
		} else {
			toast.error(`Ошибка подключения: ${resultAction.payload}`)
		}
	}

	return (
		<div className={classNames(cls.config, {}, [className])}>
			<div className={cls.dbFields}>
				<div className={cls.dbName}>
					<Input
						label='Database'
						type='text'
						value={databaseConfig.dbname}
						onChange={value => {
							dispatch(databaseActions.setDbName(value))
						}}
					/>
				</div>
				<div className={cls.dbAddress}>
					<Input
						label='Host'
						type='text'
						value={databaseConfig.address}
						onChange={value => {
							dispatch(databaseActions.setAddress(value))
						}}
					/>
				</div>
				<div className={cls.dbPort}>
					<Input
						label='Port'
						type='number'
						value={databaseConfig.port}
						onChange={value => {
							dispatch(databaseActions.setPort(value))
						}}
					/>
				</div>
				<div className={cls.dbUser}>
					<Input
						label='User'
						type='text'
						value={databaseConfig.username}
						onChange={value => {
							dispatch(databaseActions.setUsername(value))
						}}
					/>
				</div>
				<div className={cls.dbPassword}>
					<Input
						className={cls.dbPassword}
						label='Password'
						type='password'
						value={databaseConfig.password}
						onChange={value => {
							dispatch(databaseActions.setPassword(value))
						}}
					/>
				</div>
			</div>
			<Button
				disabled={status === 'loading'}
				onClick={sendDatabaseConfigHandler}
				size='l'
			>
				Сохранить
			</Button>
		</div>
	)
}
