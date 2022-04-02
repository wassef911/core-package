import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map, tap } from 'rxjs/operators';

import { setItem, StorageItem } from '../../../index';
import { Manager } from '../../../models/class/manager';
import { LoginResponse, LoginResponseManager } from '../../../models/class/user';
import { IUserEffect } from '../../../models/interface/user.effect.interface';
import { ManagerService } from '../../../services/manager.service';

import { ManagerFacade } from './manager.facade';
import { LoginStart, UserActionTypes, LoginDone, LoadUser, UserLoaded } from './user.action';
import { UserEffects } from './user.effects';
import { UserState } from './user.reducer';


@Injectable({ providedIn: 'root' })
export class ManagerEffects implements IUserEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    protected _userEffects: UserEffects,
    protected _managerFacade: ManagerFacade,
    private _managerService: ManagerService,
    private dataPersistence: DataPersistence<UserState>,
  ) {
  }

  @Effect()
  login$ = this.dataPersistence.fetch(UserActionTypes.LoginManagerStart, {
    run: (action: LoginStart, state: UserState) => {
      return this._managerService
        .loginOnlyPhone(action.payload.phone, action.payload.password)
        .pipe(
          map(
            (res: LoginResponseManager) => {
              this._userEffects._munisFacade.setMuniFromId(res.municipality_id, false);
              return new LoginDone(res);
            }
          ),
          tap((action) => {
            this._managerFacade.loadUser();
          })
        );
    },

    onError: (action: LoginStart, error) => {
      throw new Error('لم يتم العثور على مستخدم');
    },
  });

  @Effect()
  loadUser$ = this.dataPersistence.fetch(UserActionTypes.LoadManager, {
    run: (action: LoadUser, state: UserState) => {
      return this._managerService
        .getUser()
        .pipe(map((manager: Manager) => {
          return new UserLoaded(manager);
        }),
          tap((action) => {
            const str = window.location.href;
            if (str.split('/').includes('login') || str.split('/').includes('reset'))
              this.router.navigate(['/pages/someother_route_this_is_random']);
          })
        );
    },
    onError: (action: LoadUser, error) => {
      throw new Error('لم يتم العثور على مستخدم');
    },
  });

  refreshToken$ = this._userEffects.refreshToken$;


}
