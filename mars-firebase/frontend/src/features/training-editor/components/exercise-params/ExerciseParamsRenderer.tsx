import { DataList, DataListItem, DataListLabel, DataListValue } from '@/components/ui/data-list';
import { FC } from 'react';
import { ExerciseParam } from '../../types';
import RepetitionContainer from './RepetitionContainer';

interface ExerciseParamsRenderer {
	params: ExerciseParam[]
}

// const applyOverrides = (params: ExerciseParam, overrides: NestableParam) => {
// 	return (
// 	)
// }

const ExerciseParamsRenderer: FC<ExerciseParamsRenderer> = ({ params }) => {
	return (
		<DataList orientation="horizontal" className="gap-4">
			{params.map((param) => {

				console.log(param)
				if (param.type === 'repetitions') {
					return (
						<>
							{
								param.value.repetitions.map((repetition, index) => (
									<RepetitionContainer index={index} key={index}>
										<DataList>
											{
												repetition.params.map((repetitionParam) => (
													<DataListItem key={repetitionParam.type}>
														<DataListLabel>{repetitionParam.type}:</DataListLabel>
														<DataListValue>Test</DataListValue>
													</DataListItem>
												))
											}
										</DataList>
									</RepetitionContainer>
								))
							}
						</>
					)
				}

				return (
					<DataListItem key={param.type}>
						<DataListLabel>{param.type}:</DataListLabel>
						<DataListValue>Test</DataListValue>
					</DataListItem>
				)
			})}
		</DataList>
	)
}

export default ExerciseParamsRenderer