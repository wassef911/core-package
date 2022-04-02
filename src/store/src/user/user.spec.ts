
import { LoginCredentials, LoginResponse, User } from '../../../models/class/user';

import * as Actions from './user.action';
import { UserActionTypes } from './user.action';
import * as Reducer from './user.reducer';


const actionType_Action = [
  [UserActionTypes.LoginStart, Actions.LoginStart],
  [UserActionTypes.LoginDone, Actions.LoginDone],
  [UserActionTypes.LoadUser, Actions.LoadUser],
  [UserActionTypes.UserLoaded, Actions.UserLoaded],
  [UserActionTypes.LogoutUser, Actions.LogoutUser],
  [UserActionTypes.StopLoading, Actions.StopLoading],
];

describe('Store > User > Actions', () => {

  it('Actions should fire the right type', () => {
    actionType_Action.forEach((testCase) => {
      expect(testCase[1]).toEqual(testCase[0]);
    });
  });


  it('SHOULD Start User Login', () => {
    const payload: LoginCredentials = {
      phone: 97814709,
      password: '0597651631'
    };
    const action = new Actions.LoginStart(payload);
    expect({ ...action }).toEqual({
      type: Actions.UserActionTypes.LoginStart,
      payload
    });
  });

  it('SHOULD return proper action', () => {
    const payload: LoginResponse = new LoginResponse();
    const action = new Actions.LoginDone(payload);
    expect({ ...action }).toEqual({
      type: Actions.UserActionTypes.LoginDone,
      payload
    });
  });
});


describe('Store > User > Reducer', () => {
  it('SHOULD return the default state if you are a dumb person', () => {
    const { initialState } = Reducer;
    const state = Reducer.UserReducer(undefined, { type: null });
    expect(state).toBe(initialState);
  });

  it('SHOULD change loading state to true', () => {
    const { initialState } = Reducer;
    const payload: LoginCredentials = {
      phone: 97814709,
      password: 'string_strong'
    };
    const action = new Actions.LoginStart(payload);
    const state = Reducer.UserReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });

  it('SHOULD set a authData after loading', () => {
    const { initialState } = Reducer;
    const payload: LoginResponse = {
      access: 'string',
      refresh: 'string',
      first_login: false,
      preferred_municipality_id: 216,
      is_active: true
    };
    const action = new Actions.LoginDone(payload);
    const state = Reducer.UserReducer(initialState, action);
    expect(state.authData).toEqual(payload);
  });

  it('SHOULD set a user data after loading', () => {
    const { initialState } = Reducer;
    const payload: User = new User();
    const action = new Actions.UserLoaded(payload);
    const state = Reducer.UserReducer(initialState, action);
    expect(state.loggedIn).toEqual(payload);
  });
});
