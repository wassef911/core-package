import { Action } from '@ngrx/store';

import { LoginCredentials, LoginResponse, LoginResponseManager, User } from '../../../models/class/user';

export enum UserActionTypes {
  LoginStart = '[USER] user login start',
  LoginManagerStart = '[MANAGER] user login start',
  LoginDone = '[USER | MANAGER] user login done',

  LoadUser = '[USER] load user data',
  LoadManager = '[MANAGER] load user data',
  UserLoaded = '[USER | MANAGER] user data loaded',

  RefreshTokenStart = '[USER] user refresh token start',
  RefreshTokenDone = '[USER] user refresh token done',

  LogoutUser = '[USER] user is logged out',
  StopLoading = '[USER] stop loading',
}


export class LoginStart implements Action {
  readonly type = UserActionTypes.LoginStart;

  constructor(public payload: LoginCredentials) { }
}
export class LoginManagerStart implements Action {
  readonly type = UserActionTypes.LoginManagerStart;

  constructor(public payload: LoginCredentials) { }
}

export class LoginDone implements Action {
  readonly type = UserActionTypes.LoginDone;

  constructor(public payload: LoginResponse | LoginResponseManager) { }
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;

  constructor() { }
}
export class LoadManager implements Action {
  readonly type = UserActionTypes.LoadManager;

  constructor() { }
}

export class UserLoaded implements Action {
  readonly type = UserActionTypes.UserLoaded;

  constructor(public payload: User) { }
}

export class RefreshTokenStart implements Action {
  readonly type = UserActionTypes.RefreshTokenStart;

  constructor() { }
}

export class RefreshTokenDone implements Action {
  readonly type = UserActionTypes.RefreshTokenDone;

  constructor(public payload: string) { }
}

export class LogoutUser implements Action {
  readonly type = UserActionTypes.LogoutUser;

  constructor() { }
}

export class StopLoading implements Action {
  readonly type = UserActionTypes.StopLoading;

  constructor() { }
}

export type UserActions = LoginStart | LoginManagerStart
  | LoginDone | LoadUser | LoadManager | UserLoaded
  | RefreshTokenStart | RefreshTokenDone | LogoutUser | StopLoading;
