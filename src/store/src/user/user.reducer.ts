import { LoginResponse, User } from '../../../models/class/user';

import { UserActions, UserActionTypes } from './user.action';

export interface UserState {
  loggedIn: User | null;
  authData: LoginResponse | null;
  isLoading: boolean;
}

export const initialState: UserState = {
  loggedIn: null,
  authData: null,
  isLoading: false,
};

export function UserReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    //  case UserActionTypes.RefreshTokenStart:
    case UserActionTypes.LoadUser:
    case UserActionTypes.LoadManager:
    case UserActionTypes.LoginManagerStart:
    case UserActionTypes.LoginStart: {
      return Object.assign({}, state, { ...state, isLoading: true });
    }

    case UserActionTypes.LoginDone: {
      return Object.assign({}, state, { ...state, authData: action.payload, isLoading: false });
    }

    case UserActionTypes.UserLoaded: {
      return Object.assign({}, state, { ...state, loggedIn: action.payload, isLoading: false });
    }

    case UserActionTypes.RefreshTokenDone: {
      return Object.assign({}, state, { ...state, authData: { ...state.authData, access: action.payload }, isLoading: false });
    }

    case UserActionTypes.LogoutUser: {
      return Object.assign({}, state, { ...state, loggedIn: initialState.loggedIn, authData: initialState.authData, isLoading: false });
    }
    default:
      return state;
  }
}
