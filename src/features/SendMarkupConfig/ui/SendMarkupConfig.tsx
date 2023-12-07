import { HStack } from 'shared/ui/Stack/HStack/HStack'
import cls from './SendMarkupConfig.module.scss'
import Button from 'shared/ui/Button/Button'
import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { markupActions } from '../model/slices/markupSlice'
import { FormEvent, useMemo } from 'react'
import { Text } from 'shared/ui/Text/Text'
import { sendMarkupConfig } from '../model/services/sendMarkupConfig'
import toast from 'react-hot-toast'
import Mods from './Mods/Mods'
import DirectBlock from './DirectBlock/DirectBlock'
import LineBlock from './LineBlock/LineBlock'

export const SendMarkupConfig = () => {
	const { markupConfig, status } = useTypedSelector(state => state.markup)
	const dispatch = useAppDispatch()

	const sendMarkupConfigHandler = async (e: FormEvent) => {
		e.preventDefault()
		const result = await dispatch(sendMarkupConfig())
		if (sendMarkupConfig.fulfilled.match(result)) {
			toast.success('Отправлено!')
		} else {
			if (result.payload) {
				toast.error(`Ошибка отправки данных: ${result.payload}`)
			}
		}
	}

	const markupConfigBlocks = useMemo(
		() => [
			{
				title: 'Направления',
				buttonTitle: 'Новое направление',
				buttonAction: () => {
					dispatch(markupActions.addDirection())
				},
				configElement: markupConfig.zone.directs.map(dir => (
					<DirectBlock key={dir.index} index={dir.index} isReverse={dir.is_reverse} name={dir.name} />
				)),
			},
			{
				title: 'Полосы',
				buttonTitle: 'Новая полоса',
				buttonAction: () => {
					dispatch(markupActions.addLine())
				},
				configElement: markupConfig.zone.directs.map(dir =>
					dir.lines.map(line => (
						<LineBlock
							key={`${dir.index} ${line.index}`}
							dirIndex={dir.index}
							dirName={dir.name}
							lengths={line.lengths}
							lineIndex={line.index}
							lineName={line.name}
						/>
					))
				),
			},
		],
		[dispatch, markupConfig]
	)

	return (
		<form onSubmit={sendMarkupConfigHandler}>
			<HStack align='end' justify='between' className={cls.buttons}>
				<HStack gap='8'>
					<Button size='m' type='submit' disabled={status === 'loading'}>
						Сохранить
					</Button>
					<Button size='m' color='danger' onClick={() => dispatch(markupActions.deleteMarkup())}>
						Удалить
					</Button>
				</HStack>
				<Mods />
			</HStack>

			{markupConfigBlocks.map(({ buttonAction, buttonTitle, configElement, title }) => (
				<div key={title}>
					<Text className={cls.header} title={title} size='s' bold />
					<Button size='s' onClick={buttonAction} className={cls.button}>
						{buttonTitle}
					</Button>
					{configElement}
				</div>
			))}
		</form>
	)
}
