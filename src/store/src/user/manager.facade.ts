import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Manager } from '../../../models/class/manager';
import { LoginCredentials } from '../../../models/class/user';
import { IUserFacade } from '../../../models/interface/user.facade.interface';

import * as UserActions from './user.action';
import { UserFacade } from './user.facade';


@Injectable({
  providedIn: 'root',
})
export class ManagerFacade implements IUserFacade {
  // @ts-ignore
  authData$ = this._userFacade.authData$;

  isLoading$ = this._userFacade.isLoading$;

  // @ts-ignore
  loggedInUser$ = this._userFacade.loggedInUser$ as Observable<Manager>;

  constructor(protected _userFacade: UserFacade) {
  }

  startLogin(creds: LoginCredentials) {
    this._userFacade.store.dispatch(new UserActions.LoginManagerStart(creds));
  }

  loadUser() {
    this._userFacade.store.dispatch(new UserActions.LoadManager());
  }

  logout() {
    this._userFacade.logout();
  }

  refresh() {
    this._userFacade.refresh();
  }

  isAuthenticated(): boolean {
    return this._userFacade.isAuthenticated();
  }

  getToken(): string | null {
    return this._userFacade.getToken();
  }
}
