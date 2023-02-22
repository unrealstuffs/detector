import { FC, ReactNode } from 'react'

import styles from './Body.module.scss'

const Body: FC<{ children: ReactNode; show: boolean }> = ({
	children,
	show,
}) => {
	return (
		<div className={`${styles.body} ${show ? styles.show : ''}`}>
			{children}
		</div>
	)
}

export default Body
