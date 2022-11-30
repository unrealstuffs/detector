import { FC, ReactNode } from 'react'

import styles from './SettingsBody.module.scss'

const SettingsBlock: FC<{
	children: ReactNode
	className?: string
	header: string
}> = ({ children, className, header }) => {
	return (
		<>
			<div className={styles.settingsHeader}>{header}</div>
			<div className={`${styles.settingsBody} ${className}`}>
				{children}
			</div>
		</>
	)
}

export default SettingsBlock
