import { ReactNode } from 'react'

import cls from './SidebarBlock.module.scss'
import { classNames } from 'shared/lib/classNames'
import { Text } from 'shared/ui/Text/Text'

interface SidebarBlockProps {
	className?: string
	children: ReactNode
	header: string
}

const SidebarBlock = (props: SidebarBlockProps) => {
	const { children, className, header } = props
	return (
		<div className={classNames(cls.SidebarBlock, {}, [className])}>
			<Text title={header} bold size='m' className={cls.heading} />
			{children}
		</div>
	)
}

export default SidebarBlock
