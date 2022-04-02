import { Observable } from 'rxjs'

export interface IUserEffect {
  login$: Observable<any>;
  loadUser$: Observable<any>;
  refreshToken$: Observable<any>;
}
