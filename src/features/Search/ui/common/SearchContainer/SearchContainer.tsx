import { ReactNode } from 'react'

import { classNames } from 'shared/lib/classNames'
import cls from './SearchContainer.module.scss'

interface SearchContainerProps {
	className?: string
	children: ReactNode
}

const SearchContainer = (props: SearchContainerProps) => {
	const { className, children } = props
	return (
		<div className={classNames(cls.SearchContainer, {}, [className])}>
			{children}
		</div>
	)
}

export default SearchContainer
