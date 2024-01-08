export { DataTypes } from './ui/DataTypes/DataTypes'
export { DataAvgDelay } from './ui/DataAvgDelay/DataAvgDelay'
export { DataAvgSpeed } from './ui/DataAvgSpeed/DataAvgSpeed'
export { DataComposition } from './ui/DataComposition/DataComposition'
export { DataDensity } from './ui/DataDensity/DataDensity'
export { DataIntensity } from './ui/DataIntensity/DataIntensity'

export { typesActions, typesReducer } from './model/slices/typesSlice'
export { avgDelayActions, avgDelayReducer } from './model/slices/avgDelaySlice'
export { avgSpeedActions, avgSpeedReducer } from './model/slices/avgSpeedSlice'
export {
	compositionActions,
	compositionReducer,
} from './model/slices/compositionSlice'
export { densityActions, densityReducer } from './model/slices/densitySlice'
export {
	intensityActions,
	intensityReducer,
} from './model/slices/intensitySlice'
