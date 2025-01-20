import { ReactNode } from "react"
import { Tabs } from "../slices/tabsSlice"
import { SendCameraConfig } from "features/SendCameraConfig"
import { SendDbConfig } from "features/SendDbConfig"
import { DataAvgDelay, DataAvgSpeed, DataDensity, DataTypes } from "widgets/Data"
import { DataComposition } from "widgets/Data/ui/DataComposition/DataComposition"
import { DataIntensity } from "widgets/Data/ui/DataIntensity/DataIntensity"
import { SendMarkupConfig } from "features/SendMarkupConfig"
import { EditLoginAndPassword } from "features/EditLoginAndPassword/ui/EditLoginAndPassword"
import { useTypedSelector } from "shared/hooks/useTypedSelector"

interface SidebarPages {
	tabName: Tabs
	title: string
	blocks: {
		header: string
		element: ReactNode
		hide?: boolean
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

const useSidebarPages = () => {
	const { showChangeLoginAndPassword } = useTypedSelector(state => state.appConfig)
	const sidebarPages: SidebarPages[] = [
		{
			tabName: "data",
			title: "Данные",
			blocks: [{ header: "Данные", element: <DataList /> }],
		},
		{
			tabName: "settings",
			title: "Настройки",
			blocks: [
				{ header: "Настройки камеры", element: <SendCameraConfig /> },
				{
					header: "Параметры репликации на удаленную базу данных",
					element: <SendDbConfig />,
				},
				{
					header: "Настройки интерфейса управления",
					element: <EditLoginAndPassword />,
					hide: !showChangeLoginAndPassword,
				},
			],
		},
		{
			tabName: "shot",
			title: "Стоп-кадр",
			blocks: [
				{
					header: "Настройки разметки",
					element: <SendMarkupConfig />,
				},
			],
		},
	]

	return sidebarPages
}

export default useSidebarPages
