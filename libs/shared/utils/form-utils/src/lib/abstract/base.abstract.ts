import {AbstractControl, FormGroup} from '@angular/forms';
import {ReactiveFormUtil} from '../misc/form.util';
import {debounceTime, startWith} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ReactiveFormSchema} from '../model/formschema.model';
import {BaseFacadeService} from '@tg/shared/services';
import {FormUtil} from '@tg/shared/utils/misc';

@UntilDestroy()
export abstract class FormBaseComponent{
	form!: FormGroup;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;

	constructor(protected facade?: BaseFacadeService<unknown, unknown>) {
	}

	configureForm(formSchema: ReactiveFormSchema): void {

		this.form = ReactiveFormUtil.buildForm(
			Object.keys(formSchema.formModel || {})?.length ? formSchema.formModel : new formSchema.formModel(),
			formSchema);
		formSchema?.valueChanges && Object.keys(formSchema.valueChanges)?.forEach(key => {
			this.form.get(key)?.valueChanges.pipe(
				startWith(this.form.get(key)?.value as boolean),
				debounceTime(400),
				untilDestroyed(this)).subscribe(() =>
				ReactiveFormUtil.evaluationValueChange(formSchema, key, this.form, this.state));
		});
	}

  formBuilder(formSchema: ReactiveFormSchema): FormGroup {
    return ReactiveFormUtil.buildForm(new formSchema.formModel(), formSchema);
  }

	props(key: string): AbstractControl | null {
		return this.form.get(key);
	}

	validate(): boolean {
		this.form.invalid && this.form.markAllAsTouched();
		this.form.invalid && setTimeout(() => FormUtil.focusOnErrorElement('.p-error'), 400);
		return this.form.valid;
	}

	valueChange(type?: string): void {
    this.form.valueChanges.pipe(untilDestroyed(this), debounceTime(400)).subscribe(() => {
      // @ts-ignore
      this.facade.updateFormValue(this.form, type)
    });
	}

	patchFormValue(stateKey: string | undefined, customValue?: unknown): void {
		// @ts-ignore
    this.form.patchValue(customValue || this.facade.getSpecificState(stateKey));
	}
}
