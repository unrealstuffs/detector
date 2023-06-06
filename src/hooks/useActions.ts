import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { cameraActions } from '../store/slices/cameraSlice'
import { databaseActions } from '../store/slices/databaseSlice'
import { searchActions } from '../store/slices/searchSlice'
import { detectorActions } from '../store/slices/detectorSlice'
import { tabsActions } from '../store/slices/tabsSlice'
import { userActions } from '../store/slices/userSlice'
import { configurationActions } from '../store/slices/configurationSlice'

const allActions = {
	...detectorActions,
	...userActions,
	...configurationActions,
	...cameraActions,
	...databaseActions,
	...searchActions,
	...tabsActions,
}

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(allActions, dispatch)
}
