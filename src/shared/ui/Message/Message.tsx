import { FC } from 'react'
import styles from './Message.module.scss'

interface IMessage {
	loading: boolean
	success: boolean
	error: boolean
}

const Message: FC<IMessage> = ({ loading, success, error }) => {
	return (
		<div className={styles.message}>
			{loading && (
				<img
					src='/assets/loader_bold.gif'
					alt='Loading...'
					width={30}
				/>
			)}
			{!loading && success && (
				<span className={styles.success}>Отправлено</span>
			)}
			{!loading && error && <span className={styles.error}>Ошибка</span>}
		</div>
	)
}

export default Message
