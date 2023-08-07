import { ReactNode } from 'react'

import cls from './SidebarPage.module.scss'
import { classNames } from 'shared/lib/classNames'

interface SidebarPageProps {
	className?: string
	children: ReactNode
	show: boolean
}

const SidebarPage = (props: SidebarPageProps) => {
	const { children, show, className } = props
	return (
		<div
			className={classNames(cls.SidebarPage, { [cls.show]: show }, [
				className,
			])}
		>
			{children}
		</div>
	)
}

export default SidebarPage
