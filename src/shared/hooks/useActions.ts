import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { cameraActions } from '../../app/store/slices/cameraSlice'
import { databaseActions } from '../../app/store/slices/databaseSlice'
import { searchActions } from '../../app/store/slices/searchSlice'
import { detectorActions } from '../../app/store/slices/detectorSlice'
import { tabsActions } from '../../app/store/slices/tabsSlice'
import { userActions } from '../../app/store/slices/userSlice'
import { configurationActions } from '../../app/store/slices/configurationSlice'

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
