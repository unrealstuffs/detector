import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { cameraReducer } from './slices/cameraSlice'
import { databaseReducer } from './slices/databaseSlice'
import { searchReducer } from './slices/searchSlice'
import { detectorReducer } from './slices/detectorSlice'
import { tabsReducer } from './slices/tabsSlice'
import { userReducer } from './slices/userSlice'
import { configurationReducer } from './slices/configurationSlice'

const rootReducer = combineReducers({
	user: userReducer,
	detector: detectorReducer,
	configuration: configurationReducer,
	camera: cameraReducer,
	database: databaseReducer,
	search: searchReducer,
	tabs: tabsReducer,
})

const persistConfig = {
	key: 'root',
	storage,
	blacklist: [
		'detector',
		'modal',
		'camera',
		'database',
		'search',
		'tabs',
		'configuration',
	],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
