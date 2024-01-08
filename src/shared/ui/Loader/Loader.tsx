import { classNames } from 'shared/lib/classNames'
import cls from './Loader.module.scss'

interface LoaderProps {
	className?: string
}

const Loader = (props: LoaderProps) => {
	const { className } = props
	return (
		<div className={classNames(cls.Loader, {}, [className])}>
			<div className={cls.loaderInner}>
				<div></div>
				<div>
					<div></div>
				</div>
			</div>
		</div>
	)
}

export default Loader
