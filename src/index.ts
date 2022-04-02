
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from './environments/environment';
@Injectable({
  providedIn: 'root',
})
export default class Backend {
  static baseUrl = environment.apiBaseUrl;

  static url = environment.apiUrl;

  static frontUrl = environment.production ? 'https://www.website.tn/' : 'https://dev.website.tn/';

  static VAPID_PUBLIC_KEY = '%#%$@$@%#$@$#%@$%#$@#$%#@%$#@$#$%@%$#2';

  constructor(
    public router: Router,
  ) { }

  navigateTo = (path: string, id?: string): void => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    path = (id === undefined) ? path : path + id;
    if (isMobile || !environment.production) this.router.navigate([path]);
    else window.open(path);
  };
}


export * from './OurCommon.module';
export * from './lib/functions';
export * from './lib/const';
export * from './lib/local-storage.utils';
