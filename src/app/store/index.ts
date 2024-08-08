import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { tabsReducer } from "widgets/Sidebar"
import { userReducer } from "entities/User"
import { cameraReducer } from "features/SendCameraConfig"
import { databaseReducer } from "features/SendDbConfig"
import { videoReducer } from "entities/Video"
import {
    avgDelayReducer,
    avgSpeedReducer,
    compositionReducer,
    densityReducer,
    intensityReducer,
    typesReducer,
} from "widgets/Data"
import { detectorNameReducer } from "entities/AppTitle"
import { vehicleTypeReducer } from "entities/TypesSelect"
import { markupReducer } from "features/SendMarkupConfig"
import { appConfigReducer } from "entities/AppConfig"
import { themeReducer } from "features/ToggleTheme"

const rootReducer = combineReducers({
    appConfig: appConfigReducer,
    theme: themeReducer,
    user: userReducer,
    detectorName: detectorNameReducer,
    camera: cameraReducer,
    database: databaseReducer,
    markup: markupReducer,
    tabs: tabsReducer,
    video: videoReducer,
    types: typesReducer,
    composition: compositionReducer,
    intensity: intensityReducer,
    avgSpeed: avgSpeedReducer,
    avgDelay: avgDelayReducer,
    density: densityReducer,
    vehicleTypes: vehicleTypeReducer,
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
