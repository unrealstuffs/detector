import { MarkupConfig } from 'shared/types/MarkupConfig'
import cls from './ZonesConfig.module.scss'
import { classNames } from 'shared/lib/classNames'
import { AiOutlineClose } from 'react-icons/ai'
import { markupActions } from '../../model/slices/markupSlice'
import Checkbox from 'shared/ui/Checkbox/Checkbox'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { HStack } from 'shared/ui/Stack/HStack/HStack'

interface ZonesConfigProps {
	className?: string
	configuration: MarkupConfig
	selectedPolygon: string[]
}

const ZonesConfig = (props: ZonesConfigProps) => {
	const { configuration, className, selectedPolygon } = props
	const dispatch = useAppDispatch()

	const selectPolygon = (zone: string) => {
		const isCurrentZone =
			selectedPolygon.length === 1 && selectedPolygon[0] === zone

		dispatch(markupActions.setSelectedPolygon(isCurrentZone ? [] : [zone]))
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
						<HStack align='center' gap='8' className={cls.polygon}>
							<span
								className={classNames(
									cls.polygonTitle,
									{ [cls.selected]: isSelected },
									[]
								)}
								onClick={() => selectPolygon(zone)}
							>{`d-${index + 1}`}</span>
							<AiOutlineClose
								onClick={() =>
									dispatch(
										markupActions.removeZone({
											key: zone,
										})
									)
								}
							/>
						</HStack>
						<Checkbox
							label='Обратное движение'
							checked={configuration[zone].reverseDirection}
							onChange={checked =>
								dispatch(
									markupActions.setDirection({
										zone,
										checked,
									})
								)
							}
						/>
					</div>
				)
			})}
		</>
	)
}

export default ZonesConfig
