import {ReactiveFormSchema} from '@tg/shared/utils/form-utils';
import {SharedValidator} from '@tg/shared/utils/misc';
import {UserModel} from "./user-form";

export class UserFb {

  static userFormSchema(): ReactiveFormSchema {
    return {
      formModel: UserModel,
      skipRequiredValidators: ['lastName'],
      customValidators: {
        'email': [SharedValidator.emailValidator()]
      },
    };
  }
}
