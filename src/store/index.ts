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
import { dataReducer } from './slices/dataSlice'
import { detectorReducer } from './slices/detectorSlice'
import { modalReducer } from './slices/modalSlice'
import { userReducer } from './slices/userSlice'

const rootReducer = combineReducers({
	user: userReducer,
	detector: detectorReducer,
	modal: modalReducer,
	camera: cameraReducer,
	database: databaseReducer,
	data: dataReducer,
})

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['detector', 'modal', 'camera', 'database', 'data'],
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
