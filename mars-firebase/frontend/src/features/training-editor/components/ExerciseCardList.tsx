'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ExerciseParam } from '../types';

export type Exercise = {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
	params: ExerciseParam[]
};

type ExerciseCardListProps = {
  children: React.ReactNode[];
  onAdd?: () => void;
  className?: string;
};

const ExerciseCardList: React.FC<ExerciseCardListProps> = ({
	children,
	onAdd,
	className,
}) => {
	const handleAdd = () => {
		onAdd?.()
	};

	return (
		<div className={`flex flex-col gap-2 ${className ?? ''}`}>
			{children}
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
