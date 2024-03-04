import { AppTitle } from 'entities/AppTitle'
import AppRouter from './providers/RouterProvider/AppRouter'
import { AppToaster } from 'entities/AppToaster'
import { AppConfig } from 'entities/AppConfig'

const App = () => {
	return (
		<>
			<AppTitle />
			<AppConfig />
			<AppRouter />
			<AppToaster />
		</>
	)
}

export default App
