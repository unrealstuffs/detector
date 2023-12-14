import { FetchStatus } from 'shared/types/FetchStatus'

type StepType = 'STEP_P' | 'STEP_M' | null | number

export interface CameraFetch {
	filter: boolean
	servoX: number
	servoY: number
	zoom: StepType
	focus: StepType
}

export interface CameraSettings {
	filter: boolean
	zoom: StepType
	focus: StepType
	servoX: number
	servoY: number
}

export interface CameraSchema {
	cameraConfig: CameraSettings
	status: FetchStatus
}
