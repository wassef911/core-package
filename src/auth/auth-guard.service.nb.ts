import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { getItem, StorageItem } from '..';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!getItem(StorageItem.token)) {
      this.router.navigate(['/login']);
      return false;
    }

    const permissionsGranted = getItem(StorageItem.permissions);

    if (!permissionsGranted.includes(route.data['permissionNeeded']) && route.url[0].path !== 'dashboard') {
      this.router.navigate(['/pages/dashboard']);
      return false;
    }
    return true;
  }
}
