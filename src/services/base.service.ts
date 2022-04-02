import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Backend from '..';
import { getItem, StorageItem } from '../lib/local-storage.utils';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  static readonly url = Backend.url;

  public prefix = '';

  protected suffix = '';

  constructor() { }

  protected getUrl(param: string = '') {
    return BaseService.url + `${param}/mun/` + BaseService.getMun() + this.prefix;
  }

  static getHeadersFromToken(token: string): HttpHeaders {
    const headers = new HttpHeaders();
    return token ? headers.append('Authorization', 'Bearer ' + token) : headers;
  }

  static getHeaders(): HttpHeaders {
    const token = getItem(StorageItem.token);
    return BaseService.getHeadersFromToken(token);
  }

  static getMun(): string {
    const id = getItem(StorageItem.municipality);
    return (typeof id === 'string') ? id : '216';
  }
}
