import { memo, Suspense, useCallback } from 'react'
import { Route, RouteProps, Routes } from 'react-router-dom'
import { routeConfig } from './routeConfig'
import { RequireAuth } from './RequireAuth'
import { PageLoader } from 'entities/PageLoader'

type AppRoutesProps = RouteProps & {
	authOnly?: boolean
}

const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const element = (
			<Suspense fallback={<PageLoader />}>{route.element}</Suspense>
		)

		return (
			<Route
				key={route.path}
				path={route.path}
				element={
					route.authOnly ? (
						<RequireAuth>{element}</RequireAuth>
					) : (
						element
					)
				}
			/>
		)
	}, [])

	return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
}

export default memo(AppRouter)
