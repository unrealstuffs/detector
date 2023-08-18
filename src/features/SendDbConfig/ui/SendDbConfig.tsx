import { classNames } from 'shared/lib/classNames'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import Button from 'shared/ui/Button/Button'
import { sendDatabaseConfig } from '../model/services/sendDatabaseConfig'
import { databaseActions } from '../model/slices/databaseSlice'
import cls from './SendDbConfig.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

interface SendDbConfigProps {
	className?: string
}

export const SendDbConfig = (props: SendDbConfigProps) => {
	const { className } = props
	const { databaseConfig, status } = useTypedSelector(state => state.database)

	const dispatch = useAppDispatch()

	const sendDatabaseConfigHandler = async () => {
		await dispatch(sendDatabaseConfig())
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
							databaseActions.setDatabaseConfig({
								...databaseConfig,
								dbname: value,
							})
						}}
					/>
				</div>
				<div className={cls.dbAddress}>
					<Input
						label='Host'
						type='text'
						value={databaseConfig.address}
						onChange={value => {
							databaseActions.setDatabaseConfig({
								...databaseConfig,
								address: value,
							})
						}}
					/>
				</div>
				<div className={cls.dbPort}>
					<Input
						label='Port'
						type='number'
						value={databaseConfig.port}
						onChange={value => {
							databaseActions.setDatabaseConfig({
								...databaseConfig,
								port: value,
							})
						}}
					/>
				</div>
				<div className={cls.dbUser}>
					<Input
						label='User'
						type='text'
						value={databaseConfig.username}
						onChange={value => {
							databaseActions.setDatabaseConfig({
								...databaseConfig,
								username: value,
							})
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
							databaseActions.setDatabaseConfig({
								...databaseConfig,
								password: value,
							})
						}}
					/>
				</div>
			</div>
			<Button
				disabled={status !== 'init'}
				onClick={sendDatabaseConfigHandler}
				size='l'
			>
				{status === 'init' && 'Сохранить'}
				{status === 'error' && 'Ошибка'}
				{status === 'loading' && 'Загрузка...'}
				{status === 'success' && 'Подключено!'}
			</Button>
		</div>
	)
}
