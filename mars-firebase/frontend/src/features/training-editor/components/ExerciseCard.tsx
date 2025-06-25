'use client';

import * as React from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from '@/components/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

type ExerciseCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  initiallyOpen?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const ExerciseCard: React.FC<ExerciseCardProps> = ({
	imageSrc,
	title,
	description,
	initiallyOpen = false,
	className,
	...rest
}) => {
	const [open, setOpen] = React.useState(initiallyOpen);

	return (
		<Card
			className={`w-full max-w-sm overflow-hidden ${className ?? ''}`}
			{...rest}
		>
			<Collapsible open={open} onOpenChange={setOpen}>
				<CardHeader className="flex flex-row items-center gap-4 p-4">
					{/* Clickable area toggles open state */}
					<button
						onClick={() => setOpen(!open)}
						className="flex flex-1 items-center gap-4 text-left"
						aria-expanded={open}
					>
						<div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden">
							<Image
								src={imageSrc}
								alt={title}
								fill
								className="object-cover"
							/>
						</div>
						<CardTitle className="text-base font-semibold">{title}</CardTitle>
					</button>

					<CollapsibleTrigger asChild>
						<button
							className="rounded-full p-1 transition hover:bg-muted"
							aria-label={open ? 'Collapse' : 'Expand'}
						>
							<ChevronDown
								className={`h-5 w-5 transition-transform ${
									open ? 'rotate-180' : ''
								}`}
							/>
						</button>
					</CollapsibleTrigger>
				</CardHeader>

				<CollapsibleContent>
					<CardContent className="p-4 pt-0">
						<p className="text-sm text-muted-foreground">{description}</p>
					</CardContent>
				</CollapsibleContent>
			</Collapsible>
		</Card>
	);
};

export default ExerciseCard;
