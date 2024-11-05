import {ReactiveFormSchema} from '../model/formschema.model';
import {CustomerMockModel, UserMockModel} from './model.mock';
import {FormControl, ValidationErrors} from '@angular/forms';

class ValidatorC {
	static compare(control: FormControl): ValidationErrors {
		return control && {compare: true};
	}

	static unMatchedValue(control: FormControl): ValidationErrors {
		return control.value && {unmatchvalue: true};
	}

	static unMatchedCount(control: FormControl): ValidationErrors {
		return control.value && {unmatchedcount: true};
	}

	static unMatchedZip(control: FormControl): ValidationErrors {
		return control.value && {unmatchedzip: true};
	}
}

export const MOCK_USER_FORM_SCHEMA: ReactiveFormSchema = {
	formModel: UserMockModel,
	skipRequiredValidators: ['id'],
	customValidators: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
		'dept.name': [ValidatorC.compare],
		city: [ValidatorC.compare]
	},
	valueChanges: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
		'dept.name': [
			{
				affectedControlKeys: ['dept.name'],
				clearValue: false,
				expression: 'f:city !== f:dept.name'
			}
		],
		city: [
			{
				affectedControlKeys: ['dept.name'],
				clearValue: false,
				expression: 'f:city !== f:dept.name'
			},
			{
				affectedControlKeys: ['city'],
				clearValue: false,
				expression: 'f:city !== v:thimphu'
			}
		]
	}
};


export const MOCK_CUSTOMER_FORM_SCHEMA: ReactiveFormSchema = {
	formModel: CustomerMockModel,
	skipRequiredValidators: ['zip'],
	customValidators: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
		'address.city': [ValidatorC.unMatchedValue],
		employeeNo: [ValidatorC.unMatchedCount],
    // eslint-disable-next-line @typescript-eslint/naming-convention
		'address.zip': [ValidatorC.unMatchedZip]
	},
	valueChanges: {
		name: [
			{
				affectedControlKeys: ['zefix'],
				patchControlValue: {
					zefix: 'v:BT-001'
				},
				clearValue: false,
				expression: 'f:name === v:seliseBT'
			},
			{
				affectedControlKeys: ['zefix'],
				patchControlValue: {
					zefix: 'f:name'
				},
				clearValue: false,
				expression: 'f:name === v:seliseBD'
			},
			{
				affectedControlKeys: ['zefix'],
				patchControlValue: {
					zefix: 's:zefix'
				},
				clearValue: false,
				expression: 'f:name === v:seliseCH'
			}
		],
		employeeNo: [
			{
				affectedControlKeys: ['employeeNo'],
				clearValue: false,
				expression: 'f:employeeNo <= v:10 || f:employeeNo >= v:100'
			},
		],
    // eslint-disable-next-line @typescript-eslint/naming-convention
		'address.city': [
			{
				affectedControlKeys: ['address.city'],
				clearValue: false,
				expression: 'f:address.city !== v:Thimphu && f:address.city !== v:Dhaka'
			}
		],
    // eslint-disable-next-line @typescript-eslint/naming-convention
		'address.zip': [
			{
				affectedControlKeys: ['address.zip'],
				clearValue: false,
				expression: 'f:address.zip < v:4000 || f:address.zip > v:5000'
			}
		]
	}
};
