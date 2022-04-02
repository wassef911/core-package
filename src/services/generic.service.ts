import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class GenericCRUDService<T> extends BaseService {
  constructor(protected http: HttpClient) {
    super();
  }

  protected getUrl(arg: string = '') {
    return BaseService.url + arg + '/municipalities/' + BaseService.getMun() + this.prefix;
  }

  public get(): Observable<T[]> {
    return (this.http.get(this.getUrl() + '?per_page=150' + this.suffix, {
      headers: BaseService.getHeaders(),
    }) as Observable<T[]>)
      .pipe(first());
  }

  public getPages(page: number, perPage: number): Observable<T[]> {
    if (page === 0 && perPage === 0) return this.get();
    return (this.http.get(this.getUrl() + '?page=' + page + '&per_page=' + perPage + this.suffix, {
      headers: BaseService.getHeaders(),
    }) as Observable<T[]>).pipe(first());
  }

  public getById(id: string | number): Observable<T> {
    return (this.http.get(this.getUrl() + '/' + id + this.suffix, {
      headers: BaseService.getHeaders(),
    }) as Observable<T>).pipe(first());;
  }

  public post(body: T): Observable<T> {
    return (this.http.post(this.getUrl() + this.suffix, body, {
      headers: BaseService.getHeaders(),
    }) as Observable<T>).pipe(first());;
  }

  public put(id: string | number, body: T): Observable<T> {
    return (this.http.put(this.getUrl() + '/' + id + this.suffix, body, {
      headers: BaseService.getHeaders(),
    }) as Observable<T>).pipe(first());;
  }

  public delete(id: string | number): Observable<T> {
    return (this.http.delete(this.getUrl() + '/' + id + this.suffix, {
      headers: BaseService.getHeaders(),
    }) as Observable<T>).pipe(first());;
  }
}
