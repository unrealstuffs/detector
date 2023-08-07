import { MarkupConfig } from 'shared/types/MarkupConfig'
import cls from './CounterConfig.module.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { markupActions } from 'features/SendMarkupConfig/model/slices/markupSlice'
import { classNames } from 'shared/lib/classNames'

interface CounterConfigProps {
	className?: string
	configuration: MarkupConfig
	selectedPolygon: string[]
}

const CounterConfig = (props: CounterConfigProps) => {
	const { configuration, selectedPolygon, className } = props

	const onSelectHandler = (zone: string, line: string, counter: string) => {
		const isCurrentZone =
			selectedPolygon.length === 5 &&
			selectedPolygon[0] === zone &&
			selectedPolygon[2] === line &&
			selectedPolygon[4] === counter
		markupActions.setSelectedPolygon(
			isCurrentZone ? [] : [zone, 's', line, 's', counter]
		)
	}

	return (
		<div className={classNames(cls.CounterConfig, {}, [className])}>
			{Object.keys(configuration).map((zone, index) =>
				Object.keys(configuration[zone]['s']).map((line, lineIndex) =>
					Object.keys(configuration[zone]['s'][line]['s']).map(
						(counter, counterIndex) => {
							const isSelected =
								selectedPolygon.length === 5 &&
								[zone, 's', line, 's', counter].every(value =>
									selectedPolygon.includes(value)
								)
							return (
								<div
									key={counterIndex}
									className={cls.inputLine}
								>
									<span
										className={classNames(
											cls.input,
											{ [cls.selected]: isSelected },
											[]
										)}
										onClick={() =>
											onSelectHandler(zone, line, counter)
										}
									>
										{`d-${index + 1} l-${lineIndex + 1} s-${
											counterIndex + 1
										}`}
									</span>
									<AiOutlineClose
										onClick={() =>
											markupActions.removeCounter({
												keys: [zone, line, counter],
											})
										}
									/>
								</div>
							)
						}
					)
				)
			)}
		</div>
	)
}

export default CounterConfig
