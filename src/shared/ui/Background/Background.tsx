import { FC, ReactNode } from 'react'
import styles from './Background.module.scss'

const Background: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={styles.background}>{children}</div>
}

export default Background
