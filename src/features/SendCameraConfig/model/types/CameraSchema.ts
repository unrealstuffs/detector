import { FetchStatus } from 'shared/types/FetchStatus'

type StepType = 'STEP_P' | 'STEP_M' | null

export interface CameraFetch {
	filter: boolean
}

export interface CameraSettings {
	filter: boolean
	zoom: StepType
	focus: StepType
}

export interface CameraSchema {
	cameraConfig: CameraSettings
	status: FetchStatus
}
