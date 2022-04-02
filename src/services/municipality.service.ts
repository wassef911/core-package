import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Municipality } from '../models/class/municipality';

import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root',
})
export class MunicipalityService extends BaseService {
  constructor(protected http: HttpClient) {
    super();
    this.prefix = '/municipalities';
  }

  getMunicipalities(activeOnly = false, showDetails = false): Observable<Municipality[]> {
    let params = new HttpParams();
    if (showDetails) {
      params = params.append('show_details', 'True');
    }
    if (activeOnly) {
      params = params.append('is_active', 'True');
    }
    return this.http.get(BaseService.url + this.prefix, { params }) as Observable<Municipality[]>;
  }

  getById(id: string, showDetails = false): Observable<Municipality> {
    let params = new HttpParams();
    if (showDetails) {
      params = params.append('show_details', 'True');
    }

    return this.http.get(BaseService.url + this.prefix + '/' + id, { params }) as Observable<Municipality>;
  }
}
