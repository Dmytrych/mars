'use client'

import { FC, useState } from 'react'
import ExerciseCardList, { Exercise } from './ExerciseCardList';
import ExerciseCard from './ExerciseCard';
import DefaultExerciseCardDetails from './DefaultExerciseCardDetails';

const initialExercises: Exercise[] = [
	{
		id: 'pushup',
		imageSrc: '/test_image.jpg',
		title: 'Weight Lifting',
		description:
      'Strengthens chest, shoulders, and triceps. Keep your core tight for best form.',
		params: [
			{
				type: 'repetitions',
				value: {
					repetitions: [
						{
							params: [
								{
									type: 'weight',
									value: {
										units: 'kg',
										value: 12
									}
								}
							]
						}
					]
				}
			},
			{
				type: 'weight',
				value: {
					units: 'kg',
					value: 12
				}
			},
			{
				type: 'string',
				value: {
					name: 'Pace',
					data: 'slow'
				}
			}
		]
	},
];

const TrainingEditor: FC<void> = () => {
	const [items, setItems] = useState<Exercise[]>(initialExercises)

	const handleAddItem = () => {
		setItems((prev) => [...prev, 	{
			id: Math.random().toString(),
			imageSrc: '/test_image.jpg',
			title: 'Push-Ups',
			description:
      'Strengthens chest, shoulders, and triceps. Keep your core tight for best form.',
			params: []
		}])
	}

	return (
		<div className='container flex justify-center'>
			<div>
				<ExerciseCardList onAdd={handleAddItem}>
					{items.map((ex) => (
						<ExerciseCard
							key={ex.id}
							imageSrc={ex.imageSrc}
							title={ex.title}
							expandableContent={<DefaultExerciseCardDetails description={ex.description} params={ex.params} />}
						/>
					))}
				</ExerciseCardList>
			</div>
		</div>
	)
}

export default TrainingEditor