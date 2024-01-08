import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchVehicleTypes } from '../services/fetchVehicleTypes'

interface VehicleTypeState {
	vehicleTypes: string[]
}

const initialState: VehicleTypeState = {
	vehicleTypes: [],
}

const vehicleTypeSlice = createSlice({
	name: 'vehicleType',
	initialState,
	reducers: {
		setVehicleTypes(state, action) {
			state.vehicleTypes = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(
			fetchVehicleTypes.fulfilled,
			(state, action: PayloadAction<string[]>) => {
				state.vehicleTypes = action.payload
			}
		)
		builder.addCase(fetchVehicleTypes.rejected, state => {
			state.vehicleTypes = []
		})
	},
})

export const vehicleTypeActions = vehicleTypeSlice.actions
export const vehicleTypeReducer = vehicleTypeSlice.reducer
