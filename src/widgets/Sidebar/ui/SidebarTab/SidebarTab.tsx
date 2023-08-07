import { classNames } from 'shared/lib/classNames'
import cls from './SidebarTab.module.scss'

interface TabProps {
	className?: string
	children: string
	active: boolean
	onClick: () => void
}

const SidebarTab = (props: TabProps) => {
	const { children, active, onClick, className } = props
	return (
		<div
			className={classNames(cls.SidebarTab, { [cls.active]: active }, [
				className,
			])}
			onClick={onClick}
		>
			{children}
		</div>
	)
}

export default SidebarTab
