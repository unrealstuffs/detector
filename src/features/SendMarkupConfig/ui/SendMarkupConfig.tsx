import { HStack } from 'shared/ui/Stack/HStack/HStack'
import cls from './SendMarkupConfig.module.scss'
import Button from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { AiOutlineClose } from 'react-icons/ai'
import Checkbox from 'shared/ui/Checkbox/Checkbox'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { markupActions } from '../model/slices/markupSlice'
import { useMemo } from 'react'
import { Text } from 'shared/ui/Text/Text'
import AppSelect from 'shared/ui/AppSelect/AppSelect'
import { VStack } from 'shared/ui/Stack/VStack/VStack'

export const SendMarkupConfig = () => {
	const { markupConfig } = useTypedSelector(state => state.markup)
	const { videoSize, scale } = useTypedSelector(state => state.video)
	const dispatch = useAppDispatch()

	const markupConfigBlocks = useMemo(
		() => [
			{
				title: 'Направления',
				buttonTitle: 'Новое направление',
				buttonAction: () => {
					dispatch(markupActions.addDirection())
				},
				configElement: markupConfig.directs.map(dir => (
					<HStack key={dir.index} align='center' justify='start' gap='12' className={cls.block}>
						<VStack align='stretch' gap='8'>
							<span className={cls.polygonTitle}>{dir.name}</span>
							<Checkbox label='Обратное движение' checked={dir.is_reverse} className={cls.checkbox} />
						</VStack>
						<AiOutlineClose />
					</HStack>
				)),
			},
			{
				title: 'Полосы',
				buttonTitle: 'Новая полоса',
				buttonAction: () => {
					dispatch(
						markupActions.addLine({
							width: videoSize.width,
							height: videoSize.height,
							scale,
						})
					)
				},
				configElement: markupConfig.directs.map(dir =>
					dir.lines.map(line => (
						<HStack key={line.index} align='center' justify='start' gap='12' className={cls.block}>
							<span className={cls.polygonTitle}>{line.name}</span>
							<Input size='s' type='number' min={0} max={99} value={line.length} className={cls.input} />
							<AppSelect
								// defaultValue={{ value: 0, label: 'd-1' }}
								value={{ value: dir.index, label: dir.name }}
								options={markupConfig.directs.map(item => ({ label: item.name, value: item.index }))}
								onChange={value => {
									if (!value) return
									dispatch(
										markupActions.bindLine({
											dirIndex: dir.index,
											lineIndex: line.index,
											newDirIndex: value?.value,
										})
									)
								}}
							/>
							<AiOutlineClose />
						</HStack>
					))
				),
			},
		],
		[dispatch, scale, videoSize, markupConfig]
	)

	return (
		<div>
			<HStack className={cls.actions} gap='16'>
				<Button size='m'>Сохранить</Button>
				<Button size='m' color='danger'>
					Удалить
				</Button>
			</HStack>

			{markupConfigBlocks.map(({ buttonAction, buttonTitle, configElement, title }) => (
				<div key={title} className={cls.configBlock}>
					<Text className={cls.header} title={title} size='s' bold />
					<Button size='s' onClick={buttonAction} className={cls.button}>
						{buttonTitle}
					</Button>
					{configElement}
				</div>
			))}
		</div>
	)
}
