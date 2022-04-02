import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserFacade } from '../store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {

  constructor(public router: Router, private _userFacade: UserFacade) { }

  canActivate(): boolean {
    if (this._userFacade.isAuthenticated()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
