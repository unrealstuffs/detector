import React, { Component } from 'react'
import Flatpickr from 'react-flatpickr'
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin'
import 'flatpickr/dist/flatpickr.min.css'
import 'flatpickr/dist/themes/light.css'

interface DatePickerProps {
	selectValue?: any
	options?: object
	disabled?: boolean
	placeholder?: string
	fromDateID?: string
}

interface DatePickerState {
	selectValue: any
	options: object
	disabled: boolean
	placeholder: string
}

export default class DatePicker extends Component<
	DatePickerProps,
	DatePickerState
> {
	private refDatePicker: any

	constructor(props: DatePickerProps) {
		super(props)
		this.clearDate = this.clearDate.bind(this)

		this.state = {
			selectValue: props.selectValue ? props.selectValue : '',
			options: props.options
				? Object.assign({}, props.options, {
						plugins: [
							new (rangePlugin as any)({
								input: '#' + props.fromDateID,
							}),
						],
				  })
				: {
						plugins: [
							new (rangePlugin as any)({
								input: '#' + props.fromDateID,
							}),
						],
				  },
			disabled: props.disabled ? props.disabled : false,
			placeholder: props.placeholder ? props.placeholder : '',
		}
	}

	componentWillReceiveProps(newProps: DatePickerProps) {
		this.setState({
			selectValue: newProps.selectValue ? newProps.selectValue : '',
			options: newProps.options
				? Object.assign({}, newProps.options, {
						plugins: [
							new (rangePlugin as any)({
								input: '#' + newProps.fromDateID,
							}),
						],
				  })
				: {
						plugins: [
							new (rangePlugin as any)({
								input: '#' + newProps.fromDateID,
							}),
						],
				  },
			disabled: newProps.disabled ? newProps.disabled : false,
			placeholder: newProps.placeholder ? newProps.placeholder : '',
		})
	}

	clearDate() {
		this.refDatePicker.flatpickr.clear()
	}

	render() {
		return (
			<Flatpickr
				className='w-full bg-white border border-light rounded-md p-2 outline-none'
				disabled={this.state.disabled}
				ref={(r: any) => (this.refDatePicker = r)}
				placeholder={this.state.placeholder}
				options={this.state.options}
				value={this.state.selectValue}
			/>
		)
	}
}
