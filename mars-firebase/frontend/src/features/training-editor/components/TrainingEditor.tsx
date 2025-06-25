'use client'

import { FC, useState } from 'react'
import ExerciseCardList from './ExerciseCardList';

const initialExercises = [
	{
		id: 'pushup',
		imageSrc: '/test_image.jpg',
		title: 'Push-Ups',
		description:
      'Strengthens chest, shoulders, and triceps. Keep your core tight for best form.',
	},
];

const TrainingEditor: FC<void> = () => {
	const [items, setItems] = useState(initialExercises)

	const handleAddItem = () => {
		setItems((prev) => [...prev, 	{
			id: 'pushup',
			imageSrc: '/test_image.jpg',
			title: 'Push-Ups',
			description:
      'Strengthens chest, shoulders, and triceps. Keep your core tight for best form.',
		}])
	}

	return (
		<div className='flex justify-center'>
			<div className='max-w-80 grow'>
				<ExerciseCardList
					exercises={items}
					onAdd={handleAddItem}
				/>
			</div>
		</div>
	)
}

export default TrainingEditor