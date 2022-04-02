// @ts-nocheck
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './ui/ui.reducer';
import * as fromUser from './user/user.reducer';
export interface AppState {
  ui: fromUi.UiState,
  user: fromUser.UserState,
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUi.UiReducer,
  user: fromUser.UserReducer,
};

// left selectors here so they can be composed if needed

// SELECTORS for ui
// ------------------
export const selectUiState = createFeatureSelector<fromUi.UiState>('ui');

export const selectedfeatureIsLoading = createSelector(selectUiState, (selectUiState) => selectUiState.featureIsLoading);


// ------------------
// SELECTORS for user
// ------------------

export const selectUser = createFeatureSelector<fromUser.UserState>('user');

export const selectedAuth = createSelector(selectUser, (selectUser) => selectUser.authData);

export const selectLoggedInUser = createSelector(selectUser, (selectUser) => selectUser.loggedIn);

export const selectUserIsloading = createSelector(selectUser, (selectUser) => selectUser.isLoading);
