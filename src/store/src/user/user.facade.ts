import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { selectedAuth, selectLoggedInUser, selectUserIsloading } from '..';
import { getItem, StorageItem } from '../../../lib/local-storage.utils';
import { LoginCredentials } from '../../../models/class/user';
import { IUserFacade } from '../../../models/interface/user.facade.interface';

import * as UserActions from './user.action';
import { UserState } from './user.reducer';

@Injectable({
  providedIn: 'root',
})
export class UserFacade implements IUserFacade {
  // @ts-ignore
  authData$ = this.store.pipe(select(selectedAuth));

  isLoading$ = this.store.pipe(select(selectUserIsloading));

  // @ts-ignore
  loggedInUser$ = this.store.pipe(select(selectLoggedInUser));

  constructor(public store: Store<UserState>) { }

  startLogin(creds: LoginCredentials) {
    this.store.dispatch(new UserActions.LoginStart(creds));
  }

  loadUser() {
    if (this.isAuthenticated())
      this.store.dispatch(new UserActions.LoadUser());
  }

  logout() {
    this.store.dispatch(new UserActions.LogoutUser());
    localStorage.clear();
  }

  refresh() {
    this.store.dispatch(new UserActions.RefreshTokenStart());
  }

  isAuthenticated(): boolean {
    const token = getItem(StorageItem.token);
    return token?.length ? true : false;
  }

  getToken(): string | null {
    return getItem(StorageItem.token);
  }
}
