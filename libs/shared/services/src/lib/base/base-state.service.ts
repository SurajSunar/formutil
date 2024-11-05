import {Injectable} from '@angular/core';
import {ObservableStore} from '@codewithdan/observable-store';
import {Observable, startWith} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class BaseStateService<T> extends ObservableStore<T> {
	constructor() {
		super({trackStateHistory: false});
	}

	specificStateChange<U>(stateKey: string, allowFilter: boolean = true): Observable<U> {
    return this.stateWithPropertyChanges.pipe(
      startWith({ stateChanges: { [stateKey]: this.getSpecificState<U>(stateKey) } }),
      // @ts-ignore
      filter(stateChange => !allowFilter || (allowFilter && !!stateChange?.stateChanges?.[stateKey])),
      // @ts-ignore
      map(stateChange => stateChange?.stateChanges?.[stateKey]));
	}

  specificGlobalStateChange<U>(stateKey: string): Observable<U> {
    return this.globalStateWithPropertyChanges.pipe(
      startWith({ stateChanges: { [stateKey]: this.getSpecificState<U>(stateKey) } }),
      // @ts-ignore
			filter(stateChange => !!stateChange?.stateChanges?.[stateKey]),
      // @ts-ignore
      map(stateChange => stateChange?.stateChanges?.[stateKey]));
	}

  updateSpecificState<U>(data: U, stateKey: string, dispatch: boolean): T {
		return this.setState({[stateKey]: data} as unknown as Partial<T>, 'UPDATE_' + stateKey.toUpperCase(), dispatch);
	}

	updateCombinedStates<U>(data: U): T {
		return this.setState(data as unknown as Partial<T>, 'UPDATE_COMBINED_STATES');
	}

  // @ts-ignore
  getSpecificState = <U>(state?: string): U => state ? this.getState()[state] : this.getState();
}
