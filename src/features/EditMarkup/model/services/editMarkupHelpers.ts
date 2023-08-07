import { KonvaEventObject } from 'konva/lib/Node'

export const handleDragMove = (
	e: KonvaEventObject<DragEvent>,
	areaPoints: number[][]
) => {
	const draggedCircle = e.target
	const stage = draggedCircle.getStage()
	const position = draggedCircle.position()

	if (!stage) return

	const constraints = areaPoints.map(point => {
		return [point[0] + stage.x(), point[1] + stage.y()]
	})

	if (!isPointInsidePolygon([position.x, position.y], constraints)) {
		const nearestPoint = findNearestPoint(
			[position.x, position.y],
			constraints
		)
		draggedCircle.position(nearestPoint)
	}
}

const isPointInsidePolygon = (point: number[], polygon: number[][]) => {
	const x = point[0]
	const y = point[1]
	let inside = false

	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const xi = polygon[i][0]
		const yi = polygon[i][1]
		const xj = polygon[j][0]
		const yj = polygon[j][1]

		const intersect =
			//eslint-disable-next-line
			yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
		if (intersect) {
			inside = !inside
		}
	}

	return inside
}

const findNearestPoint = (point: number[], polygon: number[][]) => {
	let nearestPoint = polygon[0]
	let nearestDistanceSquared = getDistanceSquared(point, nearestPoint)

	for (let i = 0; i < polygon.length; i++) {
		const currentPoint = polygon[i]
		const nextPoint = polygon[(i + 1) % polygon.length]
		const closestPoint = getClosestPointOnSegment(
			point,
			currentPoint,
			nextPoint
		)
		const distanceSquared = getDistanceSquared(point, closestPoint)

		if (distanceSquared < nearestDistanceSquared) {
			nearestPoint = closestPoint
			nearestDistanceSquared = distanceSquared
		}
	}

	return { x: nearestPoint[0], y: nearestPoint[1] }
}

const getClosestPointOnSegment = (
	point: number[],
	start: number[],
	end: number[]
) => {
	const [px, py] = point
	const [sx, sy] = start
	const [ex, ey] = end

	const lineLengthSquared = getDistanceSquared(start, end)
	if (lineLengthSquared === 0) {
		return [sx, sy]
	}

	const t = Math.max(
		0,
		Math.min(
			1,
			((px - sx) * (ex - sx) + (py - sy) * (ey - sy)) / lineLengthSquared
		)
	)

	const closestX = sx + t * (ex - sx)
	const closestY = sy + t * (ey - sy)

	return [closestX, closestY]
}

const getDistanceSquared = (pointA: number[], pointB: number[]) => {
	const dx = pointA[0] - pointB[0]
	const dy = pointA[1] - pointB[1]
	return dx * dx + dy * dy
}

export const getMiddleOfPolygon = (polygon: number[][]) => {
	const minX = Math.min(...polygon.map(([x]) => x))
	const maxX = Math.max(...polygon.map(([x]) => x))
	const minY = Math.min(...polygon.map(([, y]) => y))
	const maxY = Math.max(...polygon.map(([, y]) => y))

	const centerX = minX + (maxX - minX) / 2
	const centerY = minY + (maxY - minY) / 2

	return { centerX, centerY }
}
