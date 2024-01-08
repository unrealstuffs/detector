import { ReactNode } from 'react'
import cls from './LoginPageLayout.module.scss'
import { classNames } from 'shared/lib/classNames'

interface LoginLayoutProps {
	children: ReactNode
	className?: string
}

const LoginPageLayout = (props: LoginLayoutProps) => {
	const { children, className } = props
	return (
		<div className={classNames(cls.background, {}, [className])}>
			{children}
		</div>
	)
}

export default LoginPageLayout
