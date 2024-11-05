import {Observable} from 'rxjs';
import {FormArray, FormGroup} from '@angular/forms';

export class BaseFacadeService<T, V> {
  currentStateService: T;

  constructor(state: T) {
    this.currentStateService = state;
  }

  change(): void {
    //
  }


  // @ts-ignore
  initialize = (): void => this.currentStateService['initialState']();

  // @ts-ignore
  stateChange = (): Observable<V> => this.currentStateService['stateChanged'];

  // @ts-ignore
  updateSpecificState = <U>(data: U, stateKey: string, dispatch: boolean = true): void => this.currentStateService['updateSpecificState']<U>(data, stateKey, dispatch);

  // @ts-ignore
  updateCombinedStates = <U>(data: U): void => this.currentStateService['updateCombinedStates']<U>(data);

  // @ts-ignore
  specificStateChange = <U>(stateKey: string, allowFilter: boolean = true): Observable<U> => this.currentStateService['specificStateChange']<U>(stateKey, allowFilter);

  // @ts-ignore
  specificGlobalStateChange = <U>(stateKey: string): Observable<U> => this.currentStateService['specificGlobalStateChange']<U>(stateKey);

  // @ts-ignore
  getSpecificState = <U>(state?: string): U => state ? this.currentStateService['getSpecificState'](state) : this.currentStateService['getSpecificState']();

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  updateFormValue = (value: (FormGroup | FormArray), type?: string): void => {
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
  patchFormValue = (value: unknown): void => {
  };
}
