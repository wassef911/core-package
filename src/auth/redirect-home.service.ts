import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserFacade } from '../store';


@Injectable({
  providedIn: 'root',
})
export class RedirectHomeService {
  constructor(
    public router: Router,
    public jwtHelper: JwtHelperService,
    private _userFacade: UserFacade,
  ) { }

  canActivate(): boolean {
    if (!this._userFacade.isAuthenticated()) {
      this.router.navigate(['/home']);
    };
    return true;
  }
}
