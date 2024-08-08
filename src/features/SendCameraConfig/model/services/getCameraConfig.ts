import { createAsyncThunk } from "@reduxjs/toolkit"
import { CameraFetch } from "../types/CameraSchema"
import { ThunkConfig } from "app/store"

export const getCameraConfig = createAsyncThunk<
    CameraFetch,
    void,
    ThunkConfig<any>
>("detector/getCameraConfig", async (_, { rejectWithValue, getState }) => {
    const {
        user: { accessToken },
    } = getState()

    try {
        const [filter, servoX, servoY, zoomPreset] = await Promise.all([
            fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
                method: "PUT",
                body: JSON.stringify({ read: "IR_CUT" }),
                headers: {
                    Authorization: `${accessToken}`,
                },
            }),
            fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
                method: "PUT",
                body: JSON.stringify({ read: "SERVO_X" }),
                headers: {
                    Authorization: `${accessToken}`,
                },
            }),
            fetch(`${process.env.REACT_APP_INTERACTION_CAMERA_URL}`, {
                method: "PUT",
                body: JSON.stringify({ read: "SERVO_Y" }),
                headers: {
                    Authorization: `${accessToken}`,
                },
            }),
            fetch(`${process.env.REACT_APP_GET_ZOOM_PRESET}`, {
                method: "GET",
                headers: {
                    Authorization: `${accessToken}`,
                },
            }),
        ])

        const dataFilter = await filter.json()
        const dataServoX = await servoX.json()
        const dataServoY = await servoY.json()
        const dataZoomPreset = await zoomPreset.json()

        return {
            filter: dataFilter.data.IR_CUT === "on" ? true : false,
            servoX: dataServoX.data.SERVO_X || 90,
            servoY: dataServoY.data.SERVO_Y || 90,
            zoomPreset: JSON.parse(dataZoomPreset.data) || {
                current: -1,
                max_preset: -1,
            },
        }
    } catch {
        return rejectWithValue("Unknown Error")
    }
})
