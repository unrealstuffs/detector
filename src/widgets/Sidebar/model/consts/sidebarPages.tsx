import { ReactNode } from 'react'
import { Tabs } from '../slices/tabsSlice'
import { SendCameraConfig } from 'features/SendCameraConfig'
import { SendDbConfig } from 'features/SendDbConfig'
import { SendMarkupConfig } from 'features/SendMarkupConfig'
import {
	DataAvgDelay,
	DataAvgSpeed,
	DataDensity,
	DataTypes,
} from 'widgets/Data'
import { DataComposition } from 'widgets/Data/ui/DataComposition/DataComposition'
import { DataIntensity } from 'widgets/Data/ui/DataIntensity/DataIntensity'

interface SidebarPages {
	tabName: Tabs
	title: string
	blocks: {
		header: string
		element: ReactNode
	}[]
}

const DataList = () => (
	<>
		<DataTypes />
		<DataComposition />
		<DataIntensity />
		<DataAvgSpeed />
		<DataDensity />
		<DataAvgDelay />
	</>
)

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
			{ header: 'Параметры репликации на удаленную базу данных', element: <SendDbConfig /> },
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
