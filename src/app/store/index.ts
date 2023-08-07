import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { tabsReducer } from '../../widgets/Sidebar/model/slices/tabsSlice'
import { userReducer } from '../../entities/User/model/slices/userSlice'
import { dataReducer } from 'widgets/DataList/model/slices/dataSlice'
import { detectorNameReducer } from 'entities/FetchTitle/model/slices/detectorNameSlice'
import { markupReducer } from 'features/SendMarkupConfig/model/slices/markupSlice'
import { cameraReducer } from 'features/SendCameraConfig/model/slices/cameraSlice'
import { databaseReducer } from 'features/SendDbConfig/model/slices/databaseSlice'
import { videoReducer } from 'entities/Video/model/slices/videoSlice'
import { searchReducer } from 'features/SearchData'

const rootReducer = combineReducers({
	user: userReducer,
	data: dataReducer,
	detectorName: detectorNameReducer,
	markup: markupReducer,
	camera: cameraReducer,
	database: databaseReducer,
	search: searchReducer,
	tabs: tabsReducer,
	video: videoReducer,
})

export const store = configureStore({
	reducer: rootReducer,
})

export type TypeRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export interface ThunkConfig<T> {
	rejectValue: T
	state: TypeRootState
}
