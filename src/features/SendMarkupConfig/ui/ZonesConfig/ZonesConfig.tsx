import { MarkupConfig } from 'shared/types/MarkupConfig'
import cls from './ZonesConfig.module.scss'
import { classNames } from 'shared/lib/classNames'
import { AiOutlineClose } from 'react-icons/ai'
import { markupActions } from 'features/SendMarkupConfig/model/slices/markupSlice'

interface ZonesConfigProps {
	className?: string
	configuration: MarkupConfig
	selectedPolygon: string[]
}

const ZonesConfig = (props: ZonesConfigProps) => {
	const { configuration, className, selectedPolygon } = props

	const selectPolygon = (zone: string) => {
		const isCurrentZone =
			selectedPolygon.length === 1 && selectedPolygon[0] === zone

		markupActions.setSelectedPolygon(isCurrentZone ? [] : [zone])
	}

	return (
		<>
			{Object.keys(configuration).map((zone, index) => {
				const isSelected =
					selectedPolygon.length === 1 &&
					[zone].every(value => selectedPolygon.includes(value))
				return (
					<div
						key={index}
						className={classNames(cls.ZonesConfig, {}, [className])}
					>
						<div className={cls.inputLine}>
							<span
								className={classNames(
									cls.input,
									{ [cls.selected]: isSelected },
									[]
								)}
								onClick={() => selectPolygon(zone)}
							>{`d-${index + 1}`}</span>
							<AiOutlineClose
								onClick={() =>
									markupActions.removeZone({
										key: zone,
									})
								}
							/>
						</div>
						<label className={cls.zoneCheck}>
							<input
								type='checkbox'
								checked={configuration[zone].reverseDirection}
								onChange={e =>
									markupActions.setDirection({
										zone,
										checked: e.target.checked,
									})
								}
							/>
							Обратное движение
						</label>
					</div>
				)
			})}
		</>
	)
}

export default ZonesConfig
