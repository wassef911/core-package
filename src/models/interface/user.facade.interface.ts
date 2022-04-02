import { Observable } from 'rxjs';

import { Manager } from '../class/manager';
import { LoginCredentials, LoginResponse, User } from '../class/user';

export interface IUserFacade {
  authData$: Observable<LoginResponse>;
  isLoading$: Observable<boolean>;
  loggedInUser$: Observable<User | Manager>;

  startLogin(creds: LoginCredentials): void;
  loadUser(): void;
  logout(): void;
  refresh(): void;
  isAuthenticated(): boolean;
  getToken(): string | null;
}
