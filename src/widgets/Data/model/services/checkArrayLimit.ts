const ARRAY_LIMIT = 100

export const checkArrayLimit = (array: any[]) => {
	if (array.length > ARRAY_LIMIT) {
		array.splice(ARRAY_LIMIT)
	}

	return array
}
