import { HStack } from 'shared/ui/Stack/HStack/HStack'
import cls from './DirectBlock.module.scss'
import { Text } from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import { AiOutlineClose } from 'react-icons/ai'
import Checkbox from 'shared/ui/Checkbox/Checkbox'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { markupActions } from 'features/SendMarkupConfig/model/slices/markupSlice'

interface DirectBlockProps {
	name: string
	index: number
	isReverse: boolean
}

const DirectBlock = (props: DirectBlockProps) => {
	const { index, isReverse, name } = props

	const dispatch = useAppDispatch()

	return (
		<div className={cls.lineBlock}>
			<HStack align='center' className={cls.lineTitle}>
				<Text title='Направление' />
				<Input
					size='s'
					value={name}
					className={cls.lineInput}
					onChange={value => {
						dispatch(
							markupActions.setDirName({
								dirIndex: index - 1,
								name: value,
							})
						)
					}}
				/>
				<AiOutlineClose
					className={cls.deleteIcon}
					onClick={() => {
						dispatch(markupActions.deleteDir({ dirIndex: index }))
					}}
				/>
			</HStack>
			<Checkbox
				label='Обратное движение'
				checked={isReverse}
				onChange={value => {
					dispatch(
						markupActions.setDirection({
							dirIndex: index,
							isReverse: value,
						})
					)
				}}
			/>
		</div>
	)
}

export default DirectBlock
