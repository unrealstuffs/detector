import { LoginPage } from '../../../pages/LoginPage'
import { MainPage } from '../../../pages/MainPage'

export const routeConfig = {
	main: {
		path: '/',
		element: <MainPage />,
		authOnly: true,
	},
	login: {
		path: '/login',
		element: <LoginPage />,
	},
	not_found: {
		path: '*',
	},
}
