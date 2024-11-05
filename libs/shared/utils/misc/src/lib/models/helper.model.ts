export interface ControlGetterAttribute {
	property: string,
	controlKey?: string,
	computingProperty?: string,
	compute?: 'equation' | 'negation',
	comparingValue?: string | boolean
}
