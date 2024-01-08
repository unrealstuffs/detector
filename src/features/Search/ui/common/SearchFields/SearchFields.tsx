import { ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames'
import cls from './SearchFields.module.scss'

interface SearchFieldsProps {
	className?: string
	children: ReactNode
}

const SearchFields = (props: SearchFieldsProps) => {
	const { className, children } = props
	return (
		<div className={classNames(cls.SearchFields, {}, [className])}>
			{children}
		</div>
	)
}

export default SearchFields
