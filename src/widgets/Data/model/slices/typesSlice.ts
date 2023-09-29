import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchTypes } from "../api/fetchTypes"
import { searchTypes } from "../api/searchTypes"
import { Type, TypesSchema, TypesSearch } from "../types/Types"

const initialSearchObject: TypesSearch = {
    licensePlates: [],
    vehicleTypes: [],
    directions: [],
    colors: [],
    vehicle_makes: [],
    lines: [],
    timestampRange: {
        from: "",
        to: "",
    },
}

const initialState: TypesSchema = {
    data: [],
    status: "init",
    tableRows: 30,
    searchObject: initialSearchObject,
    blockFetching: false,
}

const typesSlice = createSlice({
    name: "dataTypes",
    initialState,
    reducers: {
        setTableRows: (state, action: PayloadAction<number>) => {
            state.tableRows = action.payload
        },
        resetData: (state) => {
            state.data = []
        },
        resetSearchData: (state) => {
            state.searchObject = initialSearchObject
        },
        resetStatus: (state) => {
            state.status = "init"
        },
        setLicensePlates: (state, action: PayloadAction<string>) => {
            state.searchObject.licensePlates = [action.payload]
        },
        setLicenseNumber: (state, action: PayloadAction<string>) => {
            state.searchObject.licensePlates = [action.payload + "!"]
        },
        setLicenseRegion: (state, action: PayloadAction<string>) => {
            state.searchObject.licensePlates = ["!" + action.payload]
        },
        setVehicleTypes: (state, action: PayloadAction<string>) => {
            state.searchObject.vehicleTypes = [action.payload]
        },
        setColors: (state, action: PayloadAction<string>) => {
            state.searchObject.colors = [action.payload]
        },
        setVehicleMakes: (state, action: PayloadAction<string>) => {
            state.searchObject.vehicle_makes = [action.payload]
        },
        setDirections: (state, action: PayloadAction<string>) => {
            state.searchObject.directions = [action.payload]
        },
        setLines: (state, action: PayloadAction<string>) => {
            state.searchObject.lines = [action.payload]
        },
        setTimestampRangeFrom: (
            state,
            action: PayloadAction<string | Date>
        ) => {
            state.searchObject.timestampRange.from = action.payload
        },
        setTimestampRangeTo: (state, action: PayloadAction<string | Date>) => {
            state.searchObject.timestampRange.to = action.payload
        },
        resetBlockFetching: (state) => {
            state.blockFetching = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchTypes.fulfilled,
            (state, action: PayloadAction<Type[]>) => {
                state.data.unshift(...action.payload)
            }
        )
        builder.addCase(searchTypes.pending, (state) => {
            state.blockFetching = true
            state.status = "loading"
        })
        builder.addCase(
            searchTypes.fulfilled,
            (state, action: PayloadAction<Type[]>) => {
                state.status = action.payload.length ? "success" : "nodata"
                state.data = action.payload
            }
        )
        builder.addCase(searchTypes.rejected, (state) => {
            state.status = "error"
        })
    },
})

export const typesActions = typesSlice.actions
export const typesReducer = typesSlice.reducer
