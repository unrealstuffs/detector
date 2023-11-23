import { HStack } from 'shared/ui/Stack/HStack/HStack'
import cls from './LineBlock.module.scss'
import { Text } from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { markupActions } from 'features/SendMarkupConfig/model/slices/markupSlice'
import { AiOutlineClose } from 'react-icons/ai'
import AppSelect from 'shared/ui/AppSelect/AppSelect'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'

interface LineBlockProps {
	dirIndex: number
	dirName: string
	lineIndex: number
	lineName: string
	lengths: {
		index: number
		from_gate: number
		to_gate: number
		length: number
	}[]
}

const LineBlock = (props: LineBlockProps) => {
	const { dirIndex, dirName, lineName, lengths, lineIndex } = props
	const { markupConfig } = useTypedSelector(state => state.markup)
	const dispatch = useAppDispatch()

	return (
		<div className={cls.lineBlock}>
			<HStack align='center' className={cls.lineTitle}>
				<Text title='Полоса' />
				<Input
					size='s'
					value={lineName}
					className={cls.lineInput}
					onChange={value => {
						dispatch(
							markupActions.setLineName({
								dirIndex: dirIndex - 1,
								lineIndex: lineIndex - 1,
								name: value,
							})
						)
					}}
				/>
				<AiOutlineClose
					className={cls.deleteIcon}
					onClick={() => {
						dispatch(markupActions.deleteLine({ dirIndex: dirIndex, lineIndex: lineIndex }))
					}}
				/>
			</HStack>
			<HStack align='end' justify='start' gap='12'>
				<Input
					size='s'
					type='number'
					min={0}
					max={99}
					label={`От g-${lengths[0].from_gate} до g-${lengths[0].to_gate} (м)`}
					value={lengths[0].length}
					className={cls.input}
					onChange={value => {
						dispatch(
							markupActions.setLength({
								dirIndex: dirIndex - 1,
								lineIndex: lineIndex - 1,
								fromTo: 0,
								length: +value,
							})
						)
					}}
				/>
				<Input
					size='s'
					type='number'
					min={0}
					max={99}
					label={`От g-${lengths[1].from_gate} до g-${lengths[1].to_gate} (м)`}
					value={lengths[1].length}
					className={cls.input}
					onChange={value => {
						dispatch(
							markupActions.setLength({
								dirIndex: dirIndex - 1,
								lineIndex: lineIndex - 1,
								fromTo: 1,
								length: +value,
							})
						)
					}}
				/>
				<AppSelect
					value={{ value: dirIndex, label: dirName }}
					options={markupConfig.zone.directs.map(item => ({
						label: item.name,
						value: item.index,
					}))}
					onChange={value => {
						if (!value) return
						dispatch(
							markupActions.bindLine({
								dirIndex: dirIndex,
								lineIndex: lineIndex,
								newDirIndex: value?.value,
							})
						)
					}}
				/>
			</HStack>
		</div>
	)
}

export default LineBlock
