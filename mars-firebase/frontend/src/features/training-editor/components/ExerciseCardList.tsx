'use client';

import * as React from 'react';
import ExerciseCard from './ExerciseCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export type Exercise = {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
};

type ExerciseCardListProps = {
  exercises: Exercise[];
  onAdd?: () => void;
  onChange?: (updated: Exercise[]) => void;
  className?: string;
};

const ExerciseCardList: React.FC<ExerciseCardListProps> = ({
	exercises,
	onAdd,
	onChange,
	className,
}) => {
	const [items, setItems] = React.useState<Exercise[]>(exercises);
	React.useEffect(() => setItems(exercises), [exercises]);

	const handleAdd = () => {
		if (onAdd) {
			onAdd();
			return;
		}

		const newItem: Exercise = {
			id: crypto.randomUUID(),
			imageSrc: '/placeholder.svg',
			title: 'New Exercise',
			description: 'Describe the exercise here…',
		};

		const updated = [...items, newItem];
		setItems(updated);
		onChange?.(updated);
	};

	return (
		<div className={`flex flex-col gap-4 ${className ?? ''}`}>
			{items.map((ex) => (
				<ExerciseCard
					key={ex.id}
					imageSrc={ex.imageSrc}
					title={ex.title}
					description={ex.description}
				/>
			))}
			<Button
				variant="outline"
				size="icon"
				className="mx-auto mt-2 rounded-full"
				onClick={handleAdd}
				aria-label="Add exercise"
			>
				<Plus className="h-5 w-5" />
			</Button>
		</div>
	);
};

export default ExerciseCardList;
