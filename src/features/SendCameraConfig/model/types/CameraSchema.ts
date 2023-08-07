import { FetchStatus } from '../../../../shared/types/FetchStatus'

export interface CameraSettings {
	dryCont: boolean
	filter: boolean
	zoom: number
	servoX: number
	servoY: number
	focus: number
}

export interface CameraSchema {
	cameraConfig: CameraSettings
	status: FetchStatus
}
