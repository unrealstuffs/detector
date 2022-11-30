import { useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Message from '../../ui/Message/Message'

import styles from './styles.module.scss'

const DatabaseConfig = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const { databaseConfig } = useTypedSelector(state => state.database)
	const { setDatabaseConfig } = useActions()

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)

	const sendDatabaseConfig = async () => {
		try {
			setLoading(true)
			const response = await fetch(
				`${process.env.REACT_APP_DATABASE_URL}`,
				{
					method: 'POST',
					body: JSON.stringify(databaseConfig),
					headers: {
						Authorization: `${accessToken}`,
					},
				}
			)
			const data = await response.json()

			if (data.result === 'success') {
				setLoading(false)
				setSuccess(true)
				setTimeout(() => setSuccess(false), 4000)
			} else {
				setLoading(false)
				setError(true)
				setTimeout(() => setError(false), 4000)
			}
		} catch (err) {
			setLoading(false)
			setError(true)
			setTimeout(() => setError(false), 4000)
		}
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
				<button
					disabled={loading}
					className='submit'
					onClick={sendDatabaseConfig}
				>
					Сохранить
				</button>
				<Message loading={loading} success={success} error={error} />
			</div>
		</div>
	)
}

export default DatabaseConfig
