import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { cameraActions } from '../store/slices/cameraSlice'
import { databaseActions } from '../store/slices/databaseSlice'
import { dataActions } from '../store/slices/dataSlice'
import { detectorActions } from '../store/slices/detectorSlice'
import { modalActions } from '../store/slices/modalSlice'
import { userActions } from '../store/slices/userSlice'

const allActions = {
	...detectorActions,
	...userActions,
	...modalActions,
	...cameraActions,
	...databaseActions,
	...dataActions,
}

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(allActions, dispatch)
}
