import { useState } from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { Input } from 'shared/ui/Input/Input'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import { typesActions } from 'widgets/Data'

const LicensePlatesInputs = () => {
	const dispatch = useAppDispatch()
	const [firstPart, setFirstPart] = useState('')
	const [secondPart, setSecondPart] = useState('')

	const handleFirstInputChange = (value: string) => {
		setFirstPart(value)
		dispatch(typesActions.setLicensePlates(value + '!' + secondPart + 'rf'))
	}

	const handleSecondInputChange = (value: string) => {
		setSecondPart(value)
		dispatch(typesActions.setLicensePlates(firstPart + '!' + value + 'rf'))
	}

	return (
		<HStack gap='8' align='stretch'>
			<Input
				size='s'
				placeholder='Номер ГРЗ...'
				value={firstPart}
				onChange={handleFirstInputChange}
			/>
			<Input
				size='s'
				placeholder='Код региона...'
				value={secondPart}
				onChange={handleSecondInputChange}
			/>
		</HStack>
	)
}

export default LicensePlatesInputs
