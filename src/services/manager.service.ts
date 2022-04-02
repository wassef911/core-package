import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

import { getItem, StorageItem } from '../lib/local-storage.utils';
import { Manager } from '../models/class/manager';
import { LoginResponseManager } from '../models/class/user';
import { IManagerPasswordReset } from '../models/interface/user-interface';

import { BaseService } from './base.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerService extends UserService {
  private readonly loginManagerUrl = BaseService.url + '/mun/manage/login';

  constructor(protected http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {
    super(http);
    this.prefix = '/managers';
  }

  // @ts-ignore
  public loginOnlyPhone(phone_number: number, password: string): Observable<LoginResponseManager> {
    return this.http.post(
      this.loginManagerUrl,
      { password, phone_number },
      { headers: BaseService.getHeaders() },
    ) as Observable<LoginResponseManager>;
  }

  /**
   * previously named getManager
   */
  public getUser(): Observable<Manager> {
    const userId = this.jwtHelper.decodeToken(getItem(StorageItem.token)).user_id;
    return this.http.get(this.getUrl() + '/' + userId, {
      headers: BaseService.getHeaders(),
    }) as Observable<Manager>;
  }

  public resetPasswordManager(passwords: IManagerPasswordReset): Observable<any> {
    return this.http.post(
      this.getUrl() + '/' + getItem(StorageItem.connected_user_id) + '/change-password', passwords,
      {
        headers: BaseService.getHeaders(),
      },
    );
  }
}




