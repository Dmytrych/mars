import { Separator } from '@/components/ui/separator';
import { FC, ReactNode } from 'react';

interface RepetitionContainerProps {
  index: number
  children: ReactNode | ReactNode[]
}

const RepetitionContainer: FC<RepetitionContainerProps> = ({ index, children }) => {
	return (<div className='flex flex-col border-1 rounded-md p-4 gap-2'>
		<div>
      Repetition: {index}
		</div>
		<Separator/>
		<div>
			{children}
		</div>
	</div>)
}

export default RepetitionContainer