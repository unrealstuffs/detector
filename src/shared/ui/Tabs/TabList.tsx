import { FC, ReactNode } from 'react'
import styles from './TabList.module.scss'

const TabList: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={styles.tabList}>{children}</div>
}

export default TabList
