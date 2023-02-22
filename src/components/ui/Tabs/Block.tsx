import { FC, ReactNode } from 'react'

import styles from './Block.module.scss'

const Block: FC<{
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

export default Block
