import { createSlice } from '@reduxjs/toolkit'

interface ModalState {
	show: boolean
}

const initialState: ModalState = {
	show: false,
}

const modalSlice = createSlice({
	name: 'detector',
	initialState,
	reducers: {
		toggleModal(state, action) {
			state.show = action.payload.show
		},
	},
})

export const modalActions = modalSlice.actions
export const modalReducer = modalSlice.reducer
