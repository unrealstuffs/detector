import { ReactNode, FC } from 'react'
import styles from './Layout.module.scss'

interface ILayout {
	children: ReactNode
}

const Layout: FC<ILayout> = ({ children }) => {
	return <div className={styles.layout}>{children}</div>
}

export default Layout
