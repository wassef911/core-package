import { Action } from '@ngrx/store';

export enum UiActionTypes {
  featureIsLoading = '[UI] feature is loading',
  featureIsLoaded = '[UI] feature done loading',
}

export class featureIsLoading implements Action {
  readonly type = UiActionTypes.featureIsLoading;
}
export class featureIsLoaded implements Action {
  readonly type = UiActionTypes.featureIsLoaded;
}

export type UiActions = featureIsLoading | featureIsLoaded;
