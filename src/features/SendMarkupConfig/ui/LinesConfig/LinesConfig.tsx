import { MarkupConfig } from 'shared/types/MarkupConfig'
import cls from './LinesConfig.module.scss'
import { classNames } from 'shared/lib/classNames'
import { markupActions } from '../../model/slices/markupSlice'
import { AiOutlineClose } from 'react-icons/ai'
import { Input } from 'shared/ui/Input/Input'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

interface LinesConfigProps {
	configuration: MarkupConfig
	selectedPolygon: string[]
}

const LinesConfig = (props: LinesConfigProps) => {
	const { configuration, selectedPolygon } = props

	const dispatch = useAppDispatch()

	const onChangeHandler = (value: number, zone: string, line: string) => {
		dispatch(
			markupActions.setLineLength({
				zone,
				line,
				value: value < 1 || value >= 99 ? 1 : value,
			})
		)
	}

	const onSelectHandler = (zone: string, line: string) => {
		const isCurrentZone =
			selectedPolygon.length === 3 &&
			selectedPolygon[0] === zone &&
			selectedPolygon[2] === line
		dispatch(
			markupActions.setSelectedPolygon(
				isCurrentZone ? [] : [zone, 's', line]
			)
		)
	}

	return (
		<>
			{Object.keys(configuration).map((zone, index) =>
				Object.keys(configuration[zone]['s']).map((line, lineIndex) => {
					const isSelected =
						selectedPolygon.length === 3 &&
						[zone, 's', line].every(value =>
							selectedPolygon.includes(value)
						)

					return (
						<HStack
							align='center'
							key={lineIndex}
							className={cls.inputLine}
							gap='8'
						>
							<HStack align='center' gap='8' max>
								<span
									className={classNames(
										cls.polygonTitle,
										{ [cls.selected]: isSelected },
										[]
									)}
									onClick={() => onSelectHandler(zone, line)}
								>
									{`d-${index + 1} l-${lineIndex + 1}`}
								</span>
								<Input
									size='s'
									type='number'
									min={0}
									max={99}
									value={
										configuration[zone]['s'][line]['length']
									}
									className={cls.input}
									onChange={value => {
										onChangeHandler(+value, zone, line)
									}}
								/>
							</HStack>
							<AiOutlineClose
								onClick={() =>
									dispatch(
										markupActions.removeLine({
											keys: [zone, line],
										})
									)
								}
							/>
						</HStack>
					)
				})
			)}
		</>
	)
}

export default LinesConfig
