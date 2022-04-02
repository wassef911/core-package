import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';

import { ToastLuncherService } from '../services/toast-luncher.nb.service';
import { UserFacade } from '../store';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  static _toast: ToastLuncherService;

  constructor(private _userFacade: UserFacade,
    protected _toastLuncherService: ToastLuncherService,
    public jwtHelper: JwtHelperService) {
    TokenInterceptor._toast = this._toastLuncherService;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this._userFacade.isAuthenticated()) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${this._userFacade.getToken()}` } });
    }

    if (this._userFacade.isAuthenticated() && this.jwtHelper.isTokenExpired(this._userFacade.getToken())) {
      this._userFacade.refresh();
    }

    return next.handle(request).pipe(
      retry(1),
      catchError(this.handelError)
    );
  }

  private handelError(error: HttpErrorResponse) {
    // check it is a server-side error
    if (!(error.error instanceof ErrorEvent))
      console.error(error.error.detail);
    //if (error.error?.detail) TokenInterceptor._toast.info(error.error.detail);

    return throwError(error);
  }
}
