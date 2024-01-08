import { AppTitle } from 'entities/AppTitle'
import AppRouter from './providers/RouterProvider/AppRouter'
import { AppToaster } from 'entities/AppToaster'

const App = () => {
	return (
		<>
			<AppTitle />
			<AppRouter />
			<AppToaster />
		</>
	)
}

export default App
