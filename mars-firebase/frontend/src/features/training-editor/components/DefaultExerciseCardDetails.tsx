import { Separator } from '@/components/ui/separator'
import { FC } from 'react'
import ExerciseParamsRenderer from './exercise-params/ExerciseParamsRenderer'
import { ExerciseParam } from '../types'

interface IDefaultExerciseCardDetailsProps {
  description: string
  params: ExerciseParam[]
}

const DefaultExerciseCardDetails: FC<IDefaultExerciseCardDetailsProps> = ({ description, params }) => {
	return (
		<div className='flex flex-col gap-3'>
			<div className='text-sm text-muted-foreground'>{description}</div>
			<Separator/>
			<ExerciseParamsRenderer params={params}/>
		</div>
	)
}

export default DefaultExerciseCardDetails