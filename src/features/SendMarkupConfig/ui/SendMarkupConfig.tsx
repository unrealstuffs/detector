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
import { sendMarkupConfig } from '../model/services/sendMarkupConfig'
import toast from 'react-hot-toast'

export const SendMarkupConfig = () => {
	const { markupConfig, status } = useTypedSelector(state => state.markup)
	const dispatch = useAppDispatch()

	const sendMarkupConfigHandler = async () => {
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
					<div key={`${dir.index}`} className={cls.lineBlock}>
						<HStack align='center' className={cls.lineTitle}>
							<Text title='Направление' />
							<Input
								size='s'
								value={dir.name}
								className={cls.lineInput}
								onChange={value => {
									dispatch(
										markupActions.setDirName({
											dirIndex: dir.index - 1,
											name: value,
										})
									)
								}}
							/>
							<AiOutlineClose
								className={cls.deleteIcon}
								onClick={() => {
									dispatch(markupActions.deleteDir({ dirIndex: dir.index }))
								}}
							/>
						</HStack>
						<Checkbox
							label='Обратное движение'
							checked={dir.is_reverse}
							onChange={value => {
								dispatch(
									markupActions.setDirection({
										dirIndex: dir.index,
										isReverse: value,
									})
								)
							}}
						/>
					</div>
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
						<div key={`${dir.index} ${line.index}`} className={cls.lineBlock}>
							<HStack align='center' className={cls.lineTitle}>
								<Text title='Полоса' />
								<Input
									size='s'
									value={line.name}
									className={cls.lineInput}
									onChange={value => {
										dispatch(
											markupActions.setLineName({
												dirIndex: dir.index - 1,
												lineIndex: line.index - 1,
												name: value,
											})
										)
									}}
								/>
								<AiOutlineClose
									className={cls.deleteIcon}
									onClick={() => {
										dispatch(
											markupActions.deleteLine({ dirIndex: dir.index, lineIndex: line.index })
										)
									}}
								/>
							</HStack>
							<HStack align='end' justify='start' gap='12'>
								<Input
									size='s'
									type='number'
									min={0}
									max={99}
									label={`От g-${line.lengths[0].from_gate} до g-${line.lengths[0].to_gate} (м)`}
									value={line.lengths[0].length}
									className={cls.input}
									onChange={value => {
										dispatch(
											markupActions.setLength({
												dirIndex: dir.index - 1,
												lineIndex: line.index - 1,
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
									label={`От g-${line.lengths[1].from_gate} до g-${line.lengths[1].to_gate} (м)`}
									value={line.lengths[1].length}
									className={cls.input}
									onChange={value => {
										dispatch(
											markupActions.setLength({
												dirIndex: dir.index - 1,
												lineIndex: line.index - 1,
												fromTo: 1,
												length: +value,
											})
										)
									}}
								/>
								<AppSelect
									value={{ value: dir.index, label: dir.name }}
									options={markupConfig.zone.directs.map(item => ({
										label: item.name,
										value: item.index,
									}))}
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
							</HStack>
						</div>
					))
				),
			},
		],
		[dispatch, markupConfig]
	)

	return (
		<div>
			<HStack className={cls.actions} gap='16'>
				<Button size='m' onClick={sendMarkupConfigHandler} disabled={status === 'loading'}>
					Сохранить
				</Button>
				<Button size='m' color='danger' onClick={() => dispatch(markupActions.deleteMarkup())}>
					Удалить
				</Button>
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
		</div>
	)
}
