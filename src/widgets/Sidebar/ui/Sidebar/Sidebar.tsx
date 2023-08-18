import { useTypedSelector } from 'shared/hooks/useTypedSelector'
import { tabsActions } from '../../model/slices/tabsSlice'
import cls from './Sidebar.module.scss'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import SidebarTab from '../SidebarTab/SidebarTab'
import SidebarBlock from '../SidebarBlock/SidebarBlock'
import { classNames } from 'shared/lib/classNames'
import SidebarPage from '../SidebarPage/SidebarPage'
import { sidebarPages } from 'widgets/Sidebar/model/consts/sidebarPages'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

interface SidebarProps {
	className?: string
}

export const Sidebar = (props: SidebarProps) => {
	const { className } = props
	const { tab } = useTypedSelector(state => state.tabs)
	const dispatch = useAppDispatch()

	return (
		<div className={classNames(cls.Sidebar, {}, [className])}>
			<HStack justify='start' className={cls.tabList} gap='20'>
				{sidebarPages.map(({ tabName, title }) => (
					<SidebarTab
						key={tabName}
						active={tab === tabName}
						onClick={() => dispatch(tabsActions.setTab(tabName))}
					>
						{title}
					</SidebarTab>
				))}
			</HStack>
			{sidebarPages.map(({ blocks, tabName }) => (
				<SidebarPage key={tabName} show={tab === tabName}>
					{blocks.map(({ element, header }) => (
						<SidebarBlock key={header} header={header}>
							{element}
						</SidebarBlock>
					))}
				</SidebarPage>
			))}
		</div>
	)
}
