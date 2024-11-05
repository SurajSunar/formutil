
export class UserMockModel {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dept: any;

	constructor(public city?: string) {
		this.dept = {
			id: undefined,
			name: undefined
		}
	}
}


export class CustomerMockModel {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	address: any;
	constructor(public name?: string, public zefix?: string, public employeeNo?: number) {
		this.name = 'seliseBD';
		this.address = {
			street: 'testStreet',
			streetNo: undefined,
			zip: undefined,
			city: undefined
		};
	}
}
