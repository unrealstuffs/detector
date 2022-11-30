const isPointInPoly = (poly: any, pt: number[]) => {
	for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
		((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) ||
			(poly[j][1] <= pt[1] && pt[1] < poly[i][1])) &&
			pt[0] <
				((poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1])) /
					(poly[j][1] - poly[i][1]) +
					poly[i][0] &&
			(c = !c)
	return c
}

export const drawPoly = (context: any, poly: any, color: string) => {
	context.fillStyle = 'rgba(100,100,100,0)'
	context.lineWidth = 3
	context.strokeStyle = color

	context.beginPath()
	context.moveTo(poly[0][0], poly[0][1])

	for (let i = 1; i < poly.length; i++) {
		context.lineTo(poly[i][0], poly[i][1])
	}

	context.closePath()
	context.fill()
	context.stroke()
}

export const drawPoint = (context: any, coords: any, color: string) => {
	context.lineJoin = 'round'
	context.lineWidth = 5
	context.strokeStyle = color
	for (let i = 0; i < coords.length; i++) {
		context.beginPath()
		context.arc(coords[i][0], coords[i][1], 3, 0, 2 * Math.PI, false)
		context.fillStyle = color
		context.fill()
		context.lineWidth = 5
		context.stroke()
	}
}

export const drawImage = (context: any, canvas: any) => {
	context.clearRect(0, 0, canvas.width, canvas.height)
}

const drawPointLabel = (context: any, coords: any, color: string) => {
	for (let i = 0; i < coords.length; i++) {
		context.beginPath()
		context.textAlign = 'center'
		context.fillStyle = color
		context.font = '24px sans-serif'
		context.fillText(i + 1, coords[i][0] + 10, coords[i][1] - 10)
		context.restore()
	}
}

const drawLabel = (context: any, text: string, pl: any, color: string) => {
	const dx = pl[1][0] - pl[0][0]
	const dy = pl[1][1] - pl[0][1]
	const pad = 1 / 2

	context.beginPath()
	context.textAlign = 'center'
	context.fillStyle = color
	context.font = '36px sans-serif'
	context.fillText(text, pl[0][0] + dx * pad, pl[0][1] + dy * pad - 10)
	context.restore()
}

export const drawPolygons = (dots: any, context: any) => {
	for (let k = 0; k < Object.keys(dots).length; k++) {
		if (dots['d_' + k].pl.length) {
			if (dots['d_' + k].pl.length > 1) {
				drawLabel(context, `z-${k + 1}`, dots['d_' + k].pl, '#D92128')
			}
			drawPointLabel(context, dots['d_' + k].pl, '#D92128')
			drawPoly(context, dots['d_' + k].pl, '#D92128')
			drawPoint(context, dots['d_' + k].pl, '#3E445B')
		}

		for (let i = 0; i < Object.keys(dots['d_' + k]['s']).length; i++) {
			if (
				dots['d_' + k]['s']['l_' + i].pl &&
				dots['d_' + k]['s']['l_' + i].pl.length
			) {
				dots['d_' + k]['s']['l_' + i].pl.length > 1 &&
					drawLabel(
						context,
						`z-${k + 1} l-${i + 1}`,
						dots['d_' + k]['s']['l_' + i].pl,
						'#FFDC00'
					)
				drawPoly(context, dots['d_' + k]['s']['l_' + i].pl, '#FFDC00')
				drawPoint(context, dots['d_' + k]['s']['l_' + i].pl, '#3E445B')
			}

			for (
				let j = 0;
				j < Object.keys(dots['d_' + k]['s']['l_' + i]['s']).length;
				j++
			) {
				if (
					dots['d_' + k]['s']['l_' + i]['s']['s_' + j].pl &&
					dots['d_' + k]['s']['l_' + i]['s']['s_' + j].pl.length
				) {
					dots['d_' + k]['s']['l_' + i]['s']['s_' + j].pl.length >
						1 &&
						drawLabel(
							context,
							`z-${k + 1} l-${i + 1} c-${j + 1}`,
							dots['d_' + k]['s']['l_' + i]['s']['s_' + j].pl,
							'#00C0F2'
						)
					drawPoly(
						context,
						dots['d_' + k]['s']['l_' + i]['s']['s_' + j].pl,
						'#00C0F2'
					)
					drawPoint(
						context,
						dots['d_' + k]['s']['l_' + i]['s']['s_' + j].pl,
						'#3E445B'
					)
				}
			}
		}
	}
}

export const setPoint = (
	e: React.MouseEvent<HTMLCanvasElement>,
	dots: any,
	bounding: any,
	mode: string,
	setDots: Function,
	ratio: number
): void => {
	const zoneObj = Object.keys(dots).length
	if (!zoneObj) {
		return
	}
	const lineObj = dots[`d_${zoneObj - 1}`]
		? Object.keys(dots[`d_${zoneObj - 1}`].s).length
		: 0
	const counterObj = dots[`d_${zoneObj - 1}`].s[`l_${lineObj - 1}`]
		? Object.keys(dots[`d_${zoneObj - 1}`].s[`l_${lineObj - 1}`].s).length
		: 0

	switch (mode) {
		case 'zone':
			setDots({
				...dots,
				[`d_${zoneObj - 1}`]: {
					...dots[`d_${zoneObj - 1}`],
					pl: [
						...dots[`d_${zoneObj - 1}`].pl,
						[
							(e.clientX - bounding!.left) * ratio,
							(e.clientY - bounding!.top) * ratio,
						],
					],
				},
			})

			break
		case 'line':
			if (
				isPointInPoly(dots[`d_${zoneObj - 1}`].pl, [
					(e.clientX - bounding!.left) * ratio,
					(e.clientY - bounding!.top) * ratio,
				])
			) {
				setDots({
					...dots,
					[`d_${zoneObj - 1}`]: {
						...dots[`d_${zoneObj - 1}`],
						s: {
							...dots[`d_${zoneObj - 1}`]['s'],
							[`l_${lineObj - 1}`]: {
								...dots[`d_${zoneObj - 1}`]['s'][
									`l_${lineObj - 1}`
								],
								pl: [
									...dots[`d_${zoneObj - 1}`]['s'][
										`l_${lineObj - 1}`
									].pl,
									[
										(e.clientX - bounding!.left) * ratio,
										(e.clientY - bounding!.top) * ratio,
									],
								],
							},
						},
					},
				})
			} else {
				return
			}
			break
		case 'counter':
			if (
				dots[`d_${zoneObj - 1}`]['s'][`l_${lineObj - 1}`]['s'][
					`s_${counterObj - 1}`
				].pl.length >= 2
			)
				return

			if (
				isPointInPoly(
					dots[`d_${zoneObj - 1}`]['s'][`l_${lineObj - 1}`].pl,
					[
						(e.clientX - bounding!.left) * ratio,
						(e.clientY - bounding!.top) * ratio,
					]
				)
			) {
				setDots({
					...dots,
					[`d_${zoneObj - 1}`]: {
						...dots[`d_${zoneObj - 1}`],
						s: {
							...dots[`d_${zoneObj - 1}`]['s'],
							[`l_${lineObj - 1}`]: {
								...dots[`d_${zoneObj - 1}`]['s'][
									`l_${lineObj - 1}`
								],
								s: {
									...dots[`d_${zoneObj - 1}`]['s'][
										`l_${lineObj - 1}`
									]['s'],
									[`s_${counterObj - 1}`]: {
										pl: [
											...dots[`d_${zoneObj - 1}`]['s'][
												`l_${lineObj - 1}`
											]['s'][`s_${counterObj - 1}`].pl,
											[
												(e.clientX - bounding!.left) *
													ratio,
												(e.clientY - bounding!.top) *
													ratio,
											],
										],
									},
								},
							},
						},
					},
				})
			} else {
				return
			}
			break
		default:
			return
	}
}

export const addPolygon = (dots: any, mode: string, setDots: Function) => {
	const zoneObj = Object.keys(dots).length
	const lineObj = dots[`d_${zoneObj - 1}`]
		? Object.keys(dots[`d_${zoneObj - 1}`].s).length
		: 0
	const counterObj =
		Object.keys(dots).length &&
		dots[`d_${zoneObj - 1}`] &&
		dots[`d_${zoneObj - 1}`]['s'][`l_${lineObj - 1}`]
			? Object.keys(dots[`d_${zoneObj - 1}`].s[`l_${lineObj - 1}`].s)
					.length
			: 0

	switch (mode) {
		case 'zone':
			setDots({
				...dots,
				[`d_${zoneObj}`]: {
					pl: [],
					s: {},
				},
			})
			break
		case 'line':
			setDots({
				...dots,
				[`d_${zoneObj - 1}`]: {
					...dots[`d_${zoneObj - 1}`],
					s: {
						...dots[`d_${zoneObj - 1}`]['s'],
						[`l_${lineObj}`]: {
							pl: [],
							s: {},
						},
					},
				},
			})
			break
		case 'counter':
			setDots({
				...dots,
				[`d_${zoneObj - 1}`]: {
					...dots[`d_${zoneObj - 1}`],
					s: {
						...dots[`d_${zoneObj - 1}`]['s'],
						[`l_${lineObj - 1}`]: {
							...dots[`d_${zoneObj - 1}`]['s'][
								`l_${lineObj - 1}`
							],
							s: {
								...dots[`d_${zoneObj - 1}`]['s'][
									`l_${lineObj - 1}`
								]['s'],
								[`s_${counterObj}`]: {
									pl: [],
								},
							},
						},
					},
				},
			})
			break
		default:
			return
	}
}

export const handleStepBack = (dots: any, setDots: Function, mode: string) => {
	const zoneObj = Object.keys(dots).length
	const lineObj = Object.keys(dots[`d_${zoneObj - 1}`].s).length
	const counterObj = Object.keys(
		dots[`d_${zoneObj - 1}`].s[`l_${lineObj - 1}`].s
	).length

	let tempArr: any = []

	switch (mode) {
		case 'zone':
			tempArr = [...dots[`d_${zoneObj - 1}`].pl]
			tempArr.pop()

			setDots({
				...dots,
				[`d_${zoneObj - 1}`]: {
					...dots[`d_${zoneObj - 1}`],
					pl: [...tempArr],
				},
			})
			break
		case 'line':
			tempArr = [...dots[`d_${zoneObj - 1}`].s[`l_${lineObj - 1}`].pl]
			tempArr.pop()

			setDots({
				...dots,
				[`d_${zoneObj - 1}`]: {
					...dots[`d_${zoneObj - 1}`],
					s: {
						...dots[`d_${zoneObj - 1}`].s,
						[`l_${lineObj - 1}`]: {
							...dots[`d_${zoneObj - 1}`].s[`l_${lineObj - 1}`],
							pl: [...tempArr],
						},
					},
				},
			})
			break
		case 'counter':
			tempArr = [
				...dots[`d_${zoneObj - 1}`]['s'][`l_${lineObj - 1}`]['s'][
					`s_${counterObj - 1}`
				].pl,
			]
			tempArr.pop()

			setDots({
				...dots,
				[`d_${zoneObj - 1}`]: {
					...dots[`d_${zoneObj - 1}`],
					s: {
						...dots[`d_${zoneObj - 1}`].s,
						[`l_${lineObj - 1}`]: {
							...dots[`d_${zoneObj - 1}`].s[`l_${lineObj - 1}`],
							s: {
								...dots[`d_${zoneObj - 1}`]['s'][
									`l_${lineObj - 1}`
								]['s'],
								[`s_${counterObj - 1}`]: {
									pl: [...tempArr],
								},
							},
						},
					},
				},
			})

			break
		default:
			return
	}
}
