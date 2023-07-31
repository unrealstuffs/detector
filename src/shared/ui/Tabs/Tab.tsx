import { FC } from 'react'
import styles from './Tab.module.scss'

interface TabProps {
	children: string
	active: boolean
	onClick: () => void
}

const Tab: FC<TabProps> = ({ children, active, onClick }) => {
	return (
		<div
			className={`${styles.tab} ${active ? styles.active : ''}`}
			onClick={onClick}
		>
			{children}
		</div>
	)
}

export default Tab
