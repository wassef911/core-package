import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { selectedfeatureIsLoading } from '..';

import * as UiActions from './ui.action';
import { UiState } from './ui.reducer';

@Injectable({
  providedIn: 'root',
})
export class UiFacade {
  featureIsLoading$ = this.store.pipe(select(selectedfeatureIsLoading));

  constructor(private store: Store<UiState>) { }

  setFeatureLoading() {
    this.store.dispatch(new UiActions.featureIsLoading);
  }

  setFeatureLoaded() {
    this.store.dispatch(new UiActions.featureIsLoaded);
  }
}
