import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { fromEvent, interval, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import Backend from '..';
@Injectable({
  providedIn: 'root',
})
export class PwaService {
  networkStatus = false;

  networkStatus$: Subscription = Subscription.EMPTY;

  constructor(
    private swUpdate: SwUpdate,
    private router: Router,
    private swPush: SwPush,
  ) {
    this.checkNetworkStatus();
  }

  /**
   *
   * @param hours  check for updates every 2 hours (default)
   */
  checkForUpdates(hours: number = 2) {
    interval(1000 * 60 * 60 * hours).subscribe(() => this.swUpdate.checkForUpdate());
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: Backend.VAPID_PUBLIC_KEY
    })
      .then(sub => console.log(sub))
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        this.networkStatus = status;
      });
  }

  canActivate(): boolean {
    if (this.networkStatus) return true;
    throw new Error('you are offline!');
  }
}
