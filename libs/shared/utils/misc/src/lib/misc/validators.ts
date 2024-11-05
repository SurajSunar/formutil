import {ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
// @ts-ignore
import {PhoneNumberUtil} from 'google-libphonenumber';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const phoneNumberUtil: any = PhoneNumberUtil.getInstance();

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace SharedValidator {
  export const email: RegExp = /\S+@\S+\.\S+/;
  export const internationalNumber: string = '^[+0-9]+$';
  export const password: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{12,})/;

  export const passwordValidator = (otherControl: FormControl): ValidatorFn =>
    // @ts-ignore
     (control: FormControl): {password: boolean} | null => {
      if (!control.value) {
        return null;
      }
      return control.value === otherControl.value ? null : { password: true };
    }
  ;

  export const emailValidator = (): ValidatorFn =>
    // @ts-ignore
     (control: FormControl): {email: boolean} | null => {
      if (!control.value) {
        return null;
      }
      return email.test(control.value) ? null : { email: true };
    };

  // @ts-ignore
  export const passwordRegexValidator = (): ValidatorFn => (control: FormControl): {passwordStrength: boolean} | null => {
      if (!control.value) {
        return null;
      }
      return password.test(control.value) ? null : { passwordStrength: true };
  };

  export const allEmailValidator = (): ValidatorFn =>
    // @ts-ignore
    (control: FormControl): {email: boolean} | null => {
      if (!control.value) {
        return null;
      }

      const invalid: boolean = !!(control.value as string[]).find(emailValue => !email.test(emailValue));

      return invalid ? { email: true } : null;
    };

	export function phoneNumberValidator(regionCodes: string[] = []): ValidatorFn {
		return (control: AbstractControl): { [key: string]: boolean } | null => {
			let validNumber: boolean = false;
			try {
				if (!control.value) return null;

				if (regionCodes?.length) {
					// eslint-disable-next-line max-len
					validNumber = regionCodes.some(regionCode => phoneNumberUtil.isValidNumberForRegion(phoneNumberUtil.parse(control.value, regionCode), regionCode));
				} else {
					const phoneNumber: string = phoneNumberUtil.parseAndKeepRawInput(control.value);
					validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
				}
			} catch (e) {
        //error
			}

			return validNumber ? null : regionCodes?.length ? {[`invalidPhoneNo${regionCodes.join('')}`]: true} : {invalidPhoneNo: true};
		}
	}

	export function urlValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: boolean } | null => {
			let validUrl: boolean = true;
			try {
				if (!control.value) return null;
				validUrl = control.value.match(new RegExp(/^((https?):\/\/)?[a-zA-Z0-9\-\\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/));
			} catch (e) {
				validUrl = false;
			}

			return validUrl ? null : {invalidUrl: true};
		}
	}

	export function existValidator(length: number, typeKey: string): ValidatorFn {
		return (): null | { [p: string]: boolean } => length === 0 ? null : {[typeKey]: true};
	}

  export function stringArrayValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: boolean } | null => !control.value || !control.value?.length ? {selectAllRequired: true} : null;
	}
}

export {SharedValidator as SharedValidator};
