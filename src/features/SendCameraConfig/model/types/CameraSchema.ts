import { FetchStatus } from 'shared/types/FetchStatus'

type StepType = 'STEP_P' | 'STEP_M' | null | number | 'NEXT' | 'PREV'

export interface CameraFetch {
	filter: boolean
	servoX: number
	servoY: number
	zoomPreset: {
		max_preset: number
		current: number
	}
}

export interface CameraSettings {
	filter: boolean
	zoom: StepType
	focus: StepType
	servoX: number
	servoY: number
	zoomPreset: {
		max_preset: number
		current: number
	}
}

export interface CameraSchema {
	cameraConfig: CameraSettings
	status: FetchStatus
}
