import { FC } from 'react'

interface ExerciseParamProps {
  param: Param
}

const ExerciseParam: FC<void> = () => {
	return (
		<DataListItem key={param.type}>
			<DataListLabel>{param.type}:</DataListLabel>
			<DataListValue>Test</DataListValue>
		</DataListItem>
	)
}

export default ExerciseParam