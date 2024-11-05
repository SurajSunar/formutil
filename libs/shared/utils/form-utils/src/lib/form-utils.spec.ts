
import {ComponentMock} from './mock/component.mock';
import {MOCK_CUSTOMER_FORM_SCHEMA, MOCK_USER_FORM_SCHEMA} from './mock/schema.mock';
import {fakeAsync, tick} from '@angular/core/testing';

// eslint-disable-next-line max-lines-per-function
describe('Form utils', () => {
    let fixture: ComponentMock;

    beforeEach(() => {
        fixture = new ComponentMock();
    });

    afterEach(() => {
        fixture = undefined;
    });

    // eslint-disable-next-line max-lines-per-function
    describe('Test for MOCK_USER_FORM_SCHEMA', () => {
        beforeEach(() => {
            fixture.configureForm(MOCK_USER_FORM_SCHEMA);
        });


        it('should have form defined', () => {
            expect(fixture.form).toBeTruthy();
            expect(fixture.form.value).toEqual({city: null, dept: {id: null, name: null}});
        });

        it('should have skipped validator for ID', () => {
            expect(fixture.form.get('dept.id').valid).toBeTruthy();
            expect(fixture.form.get('dept.id').errors).toBeNull();
        });

        it('should have required validator for dept.name when city is filled', () => {
            fixture.form.get('city').setValue('thimphu');
            expect(fixture.form.get('dept.name').hasError('required')).toBeTruthy();
        });

        it('should have  compare validator for dept.name for unmatched city value', () => {
            fixture.form.get('city').setValue('thimphu');
            fixture.form.get('dept.name').setValue('tehimphu');
            expect(fixture.form.get('dept.name').hasError('compare')).toBeDefined();
        });

        it('should not have compare validator for dept.name for matched city value', fakeAsync(() => {
            fixture.form.get('city').setValue('pling');
            fixture.form.get('dept.name').setValue('pling');
            tick(400);
            expect(fixture.form.get('dept.name').hasError('compare')).toBeFalsy();
        }));

        it('should have city field value as thimphu', fakeAsync(() => {
            fixture.form.get('city').setValue('thimphu');
            tick(400);
            expect(fixture.form.get('city').hasError('compare')).toBeFalsy();
        }));

        it('should throw error is city is not thimphu', fakeAsync(() => {
            fixture.form.get('city').setValue('pling');
            tick(400);
            expect(fixture.form.get('city').hasError('compare')).toBeTruthy();
        }));
    });

    // eslint-disable-next-line max-lines-per-function
    describe('Test for MOCK_CUSTOMER_FORM_SCHEMA', () => {
        beforeEach(() => {
            fixture.state = {
                zefix: 302
            };
            fixture.configureForm(MOCK_CUSTOMER_FORM_SCHEMA);
        });

        it('should have form defined', () => {
            expect(fixture.form).toBeTruthy();
            expect(fixture.form.value).toEqual(
                {name: 'seliseBD', zefix: null, employeeNo: null, address: {street: 'testStreet', streetNo: null, zip: null, city: null}});
        });

        it('should have any validation for zip code', () => {
            expect(fixture.props('address.zip').valid).toBeTruthy();
        });

        it('should add logical based value when customer name matches - Coded Value', fakeAsync(() => {
            fixture.form.get('name').setValue('seliseBT');
            tick(1000);
            expect(fixture.props('zefix').value).toEqual('BT-001');
        }));

        it('should add logical based value when customer name matches - Control Value', fakeAsync(() => {
            fixture.form.get('name').setValue('seliseBD');
            tick(500);
            expect(fixture.props('zefix').value).toEqual('seliseBD');
        }));

        it('should add logical based value when customer name matches - State Value', fakeAsync(() => {
            fixture.form.get('name').setValue('seliseCH');
            tick(500);
            expect(fixture.props('zefix').value).toEqual(302);
        }));

        it('should throw error if  city logical expression fails', fakeAsync(() => {
            fixture.form.get('address.city').setValue('Delhi');
            tick(500);
            expect(fixture.props('address.city').hasError('unmatchvalue')).toBeTruthy();
        }));

        it('should pass if  city logical expression passes', fakeAsync(() => {
            fixture.form.get('address.city').setValue('Thimphu');
            tick(500);
            expect(fixture.props('address.city').errors).toBeNull();
        }));

        it('should throw error if  employeeNo logical expression passes - check for <=', fakeAsync(() => {
            fixture.form.get('employeeNo').setValue('10');
            tick(500);
            expect(fixture.props('employeeNo').hasError('unmatchedcount')).toBeTruthy();
        }));

        it('should throw error if  employeeNo logical expression passes - check for >=', fakeAsync(() => {
            fixture.form.get('employeeNo').setValue('100');
            tick(500);
            expect(fixture.props('employeeNo').hasError('unmatchedcount')).toBeTruthy();
        }));

        it('should pass if  employeeNo logical expression passes - check for 10-100', fakeAsync(() => {
            fixture.form.get('employeeNo').setValue('50');
            tick(500);
            expect(fixture.props('employeeNo').hasError('unmatchedcount')).toBeFalsy();
        }));

        it('should pass if  zipcode logical expression - check for 10-100', fakeAsync(() => {
            fixture.form.get('address.zip').setValue('999');
            tick(500);
            expect(fixture.props('employeeNo').hasError('unMatchedZip')).toBeFalsy();
        }));
    });
});
