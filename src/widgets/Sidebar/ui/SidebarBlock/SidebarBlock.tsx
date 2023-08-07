import { ReactNode } from 'react'

import cls from './SidebarBlock.module.scss'
import { classNames } from 'shared/lib/classNames'

interface SidebarBlockProps {
	className?: string
	children: ReactNode
	header: string
}

const SidebarBlock = (props: SidebarBlockProps) => {
	const { children, className, header } = props
	return (
		<div className={classNames(cls.SidebarBlock, {}, [className])}>
			<div className={cls.header}>{header}</div>
			<div className={cls.body}>{children}</div>
		</div>
	)
}

export default SidebarBlock
