import { memo } from 'react'
import { classNames } from 'shared/lib/classNames'
import cls from './Text.module.scss'

export type TextVariant = 'primary' | 'danger'

export type TextAlign = 'right' | 'left' | 'center'

export type TextSize = 's' | 'm' | 'l'

interface TextProps {
	className?: string
	title?: string
	text?: string
	align?: TextAlign
	size?: TextSize
	bold?: boolean
	variant?: TextVariant
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToClass: Record<TextSize, string> = {
	s: cls.size_s,
	m: cls.size_m,
	l: cls.size_l,
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
	s: 'h3',
	m: 'h2',
	l: 'h1',
}

export const Text = memo((props: TextProps) => {
	const {
		className,
		text,
		title,
		align = 'left',
		size = 'm',
		bold,
		variant = 'primary',
	} = props

	const HeaderTag = mapSizeToHeaderTag[size]
	const sizeClass = mapSizeToClass[size]

	return (
		<div
			className={classNames(cls.Text, { [cls.bold]: bold }, [
				className,
				cls[align],
				cls[variant],
				sizeClass,
			])}
		>
			{title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
			{text && <p className={cls.text}>{text}</p>}
		</div>
	)
})
