import { FetchStatus } from 'shared/types/FetchStatus'

type StepType = 'STEP_P' | 'STEP_M' | null

export interface CameraSettings {
	dryCont: boolean
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
