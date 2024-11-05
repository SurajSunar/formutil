import { Component, OnInit } from '@angular/core';
import {FormBaseComponent} from "@tg/shared/utils/form-utils";
import {UserFb} from "./misc/user.fb";
import {FormUtil} from "@tg/shared/utils/misc";

@Component({
  selector: 'tg-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends FormBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.configureForm(UserFb.userFormSchema());
  }

  submit(): void {
    FormUtil.markAllFormFieldsAsTouched(this.form);

    if(this.form.valid) {
      console.log(this.form.value);
    }

  }
}
