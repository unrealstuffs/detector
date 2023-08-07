import { memo, ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames'
import cls from './MainLayout.module.scss'

interface MainLayoutProps {
	className?: string
	header: ReactNode
	sidebar: ReactNode
	video: ReactNode
}

const MainLayout = memo((props: MainLayoutProps) => {
	const { className, header, sidebar, video } = props
	return (
		<div className={classNames(cls.MainLayout, {}, [className])}>
			<div className={cls.header}>{header}</div>
			<div className={cls.page}>
				<div className={cls.video}>{video}</div>
				<div className={cls.sidebar}>{sidebar}</div>
			</div>
		</div>
	)
})

export default MainLayout
