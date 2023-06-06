import { useTypedSelector } from '../../../../../hooks/useTypedSelector'

import styles from './Database.module.scss'
import Button from '../../../../ui/Button/Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../../store'
import { sendDatabaseConfig } from '../../../../../store/slices/databaseSlice'
import { useActions } from '../../../../../hooks/useActions'

const Database = () => {
	const { databaseConfig, status } = useTypedSelector(state => state.database)
	const { setDatabaseConfig, setDatabaseConfigStatus } = useActions()

	const dispatch = useDispatch<AppDispatch>()

	const sendDatabaseConfigHandler = async () => {
		await dispatch(sendDatabaseConfig(''))

		setTimeout(() => {
			setDatabaseConfigStatus('init')
		}, 1000)
	}
	return (
		<div className={`${styles.config} ${styles.databaseConfig}`}>
			<div className={`${styles.configBody}`}>
				<div
					className={`${styles.inputGroup}`}
					style={{ width: '100%' }}
				>
					<label>Database</label>
					<input
						type='text'
						value={databaseConfig.dbname}
						onChange={e => {
							setDatabaseConfig({
								...databaseConfig,
								dbname: e.target.value,
							})
						}}
					/>
				</div>
				<div
					className={`${styles.inputGroup}`}
					style={{ width: '73%', marginRight: '2%' }}
				>
					<label>Host</label>
					<input
						type='text'
						value={databaseConfig.address}
						onChange={e => {
							setDatabaseConfig({
								...databaseConfig,
								address: e.target.value,
							})
						}}
					/>
				</div>
				<div
					className={`${styles.inputGroup}`}
					style={{ width: '25%' }}
				>
					<label>Port</label>
					<input
						type='number'
						value={databaseConfig.port}
						onChange={e => {
							setDatabaseConfig({
								...databaseConfig,
								port: e.target.value,
							})
						}}
					/>
				</div>
				<div
					className={`${styles.inputGroup}`}
					style={{ width: '49%', marginRight: '2%' }}
				>
					<label>User</label>
					<input
						type='text'
						value={databaseConfig.username}
						onChange={e => {
							setDatabaseConfig({
								...databaseConfig,
								username: e.target.value,
							})
						}}
					/>
				</div>
				<div
					className={`${styles.inputGroup}`}
					style={{ width: '49%' }}
				>
					<label>Password</label>
					<input
						type='password'
						value={databaseConfig.password}
						onChange={e => {
							setDatabaseConfig({
								...databaseConfig,
								password: e.target.value,
							})
						}}
					/>
				</div>
			</div>
			<div className={`${styles.configActions}`}>
				<Button
					disabled={status !== 'init'}
					onClick={sendDatabaseConfigHandler}
					type='primary'
					size='big'
				>
					{status === 'init' && 'Сохранить'}
					{status === 'error' && 'Ошибка'}
					{status === 'loading' && 'Загрузка...'}
					{status === 'success' && 'Отправлено!'}
				</Button>
			</div>
		</div>
	)
}

export default Database
