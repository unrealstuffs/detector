interface ServerSuccessResponse<T> {
	result: 'success'
	meta: {
		message: string
	}
	data: T
}

interface ServerErrorResponse {
	result: 'error'
	meta: {
		message: string
	}
}

export type ServerResponse<T> = ServerSuccessResponse<T> | ServerErrorResponse
