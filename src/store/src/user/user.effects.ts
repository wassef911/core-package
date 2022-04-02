import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import * as $ from 'jquery';
import { map, tap } from 'rxjs/operators';

import { setItem, StorageItem } from '../../../index';
import { LoginResponse, User } from '../../../models/class/user';
import { IUserEffect } from '../../../models/interface/user.effect.interface';
import { ToastLuncherService } from '../../../services/toast-luncher.service';
import { UserService } from '../../../services/user.service';
import { MunisFacade } from '../municipality/municipality.facade';

import { LoginStart, UserActionTypes, LoginDone, LoadUser, UserLoaded, RefreshTokenStart, RefreshTokenDone } from './user.action';
import { UserFacade } from './user.facade';
import { UserState } from './user.reducer';

@Injectable({ providedIn: 'root' })
export class UserEffects implements IUserEffect {
  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<UserState>,
    private _userService: UserService,
    public _munisFacade: MunisFacade,
    public _toastLuncher: ToastLuncherService,
    private _userFacade: UserFacade,
  ) { }

  @Effect()
  login$ = this.dataPersistence.fetch(UserActionTypes.LoginStart, {
    run: (action: LoginStart, state: UserState) => {
      return this._userService
        .loginOnlyPhone(action.payload.phone, action.payload.password)
        .pipe(
          map(
            (res: LoginResponse) => {
              this._munisFacade.setMuniFromId(res.preferred_municipality_id);
              return new LoginDone(res);
            }
          )
          ,
          tap((action) => {
            this._userFacade.loadUser();
            $('#loginModal').click();
          })
        );
    },

    onError: (action: LoginStart, error) => {
      throw new Error('لم يتم العثور على مستخدم');
    },
  });

  @Effect()
  loadUser$ = this.dataPersistence.fetch(UserActionTypes.LoadUser, {
    run: (action: LoadUser, state: UserState) => {
      return this._userService
        .getUser()
        .pipe(map((res: User) => {
          return new UserLoaded(res);
        }));
    },
    onError: (action: LoadUser, error) => {
      throw new Error('لم يتم العثور على مستخدم');
    },
  });

  @Effect()
  refreshToken$ = this.dataPersistence.fetch(UserActionTypes.RefreshTokenStart, {
    run: (action: RefreshTokenStart, state: UserState) => {
      return this._userService
        .refreshToken()
        .pipe(map((res: { access: string }) => {
          setItem(StorageItem.token, res.access);
          return new RefreshTokenDone(res.access);
        }));
    },

    onError: (action: RefreshTokenStart, error) => {
      throw new Error('لم يتم العثور على مستخدم');
    },
  });
}
