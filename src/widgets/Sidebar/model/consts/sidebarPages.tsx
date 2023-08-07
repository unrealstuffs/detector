import { ReactNode } from 'react'
import { Tabs } from '../slices/tabsSlice'
import { DataList } from 'widgets/DataList'
import { SendCameraConfig } from 'features/SendCameraConfig'
import { SendDbConfig } from 'features/SendDbConfig'
import { SendMarkupConfig } from 'features/SendMarkupConfig'

interface SidebarPages {
	tabName: Tabs
	title: string
	blocks: {
		header: string
		element: ReactNode
	}[]
}

export const sidebarPages: SidebarPages[] = [
	{
		tabName: 'data',
		title: 'Данные',
		blocks: [{ header: 'Данные', element: <DataList /> }],
	},
	{
		tabName: 'settings',
		title: 'Настройки',
		blocks: [
			{ header: 'Настройки камеры', element: <SendCameraConfig /> },
			{ header: 'Настройки базы данных', element: <SendDbConfig /> },
		],
	},
	{
		tabName: 'shot',
		title: 'Стоп-кадр',
		blocks: [
			{
				header: 'Настройки зон детектирования',
				element: <SendMarkupConfig />,
			},
		],
	},
]
