import { MarkupConfig } from 'shared/types/MarkupConfig'
import cls from './LinesConfig.module.scss'
import { classNames } from 'shared/lib/classNames'
import { markupActions } from 'features/SendMarkupConfig/model/slices/markupSlice'
import { AiOutlineClose } from 'react-icons/ai'
import { Input } from 'shared/ui/Input/Input'

interface LinesConfigProps {
	className?: string
	configuration: MarkupConfig
	selectedPolygon: string[]
}

const LinesConfig = (props: LinesConfigProps) => {
	const { configuration, className, selectedPolygon } = props

	const onChangeHandler = (value: number, zone: string, line: string) => {
		markupActions.setLineLength({
			zone,
			line,
			value: value < 1 || value >= 99 ? 1 : value,
		})
	}

	const onSelectHandler = (zone: string, line: string) => {
		const isCurrentZone =
			selectedPolygon.length === 3 &&
			selectedPolygon[0] === zone &&
			selectedPolygon[2] === line
		markupActions.setSelectedPolygon(isCurrentZone ? [] : [zone, 's', line])
	}

	return (
		<div className={classNames(cls.LinesConfig, {}, [className])}>
			{Object.keys(configuration).map((zone, index) =>
				Object.keys(configuration[zone]['s']).map((line, lineIndex) => {
					const isSelected =
						selectedPolygon.length === 3 &&
						[zone, 's', line].every(value =>
							selectedPolygon.includes(value)
						)

					return (
						<div key={lineIndex} className={cls.inputLine}>
							<span
								className={classNames(
									cls.input,
									{ [cls.selected]: isSelected },
									[]
								)}
								onClick={() => onSelectHandler(zone, line)}
							>
								{`d-${index + 1} l-${lineIndex + 1}`}
							</span>
							<Input
								type='number'
								min={0}
								max={99}
								value={configuration[zone]['s'][line]['length']}
								onChange={value => {
									onChangeHandler(+value, zone, line)
								}}
							/>

							<AiOutlineClose
								onClick={() =>
									markupActions.removeLine({
										keys: [zone, line],
									})
								}
							/>
						</div>
					)
				})
			)}
		</div>
	)
}

export default LinesConfig
