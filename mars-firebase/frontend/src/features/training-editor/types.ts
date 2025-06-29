export type ExerciseParamType = 'weight' | 'repetitions' |  'string'

interface GenericExerciseParam {
	type: ExerciseParamType
}

interface WeightParam extends GenericExerciseParam {
	type: 'weight',
	value: {
		units: 'kg' | 'lb',
		value: number
	}
}

interface StringParam extends GenericExerciseParam {
	type: 'string',
	value: {
		name: string,
		data: string
	}
}

interface RepetitionParamOverride<TParam> {
	params: TParam[]
}

interface RepetitionsParam extends GenericExerciseParam {
	type: 'repetitions',
	value: {
		repetitions: RepetitionParamOverride<NestableParam>[]
	}
}

export type NestableParam = WeightParam | StringParam

export type ExerciseParam = RepetitionsParam | WeightParam | StringParam

export interface Exercise {
	id: string,
	imageSrc: string,
	title: string,
	description: string,
	params: ExerciseParam[]
}