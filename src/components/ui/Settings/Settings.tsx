import { FC, ReactNode } from 'react'

import styles from './Settings.module.scss'

const Settings: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={styles.settings}>{children}</div>
}

export default Settings
