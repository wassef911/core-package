
import * as Actions from './ui.action';
import { UiActionTypes } from './ui.action';
import * as Reducer from './ui.reducer';

const actionType_Action = [
  [UiActionTypes.featureIsLoading, Actions.featureIsLoading],
  [UiActionTypes.featureIsLoaded, Actions.featureIsLoaded],
];

describe('Store > UI > Actions', () => {

  it('Actions should fire the right type', () => {
    actionType_Action.forEach((testCase) => {
      expect(testCase[1]).toEqual(testCase[0]);
    });
  });
});


describe('Store > UI > Reducer', () => {
  it('SHOULD return the default state if you are a dumb person', () => {
    const { initialState } = Reducer;
    const state = Reducer.UiReducer(undefined, { type: null });
    expect(state).toBe(initialState);
  });

  it('SHOULD set UI to not loading state', () => {
    const { initialState } = Reducer;
    const action = new Actions.featureIsLoaded();

    const state = Reducer.UiReducer(initialState, action);
    expect(state.featureIsLoading).toEqual(false);
  });

  it('SHOULD set UI to loading state', () => {
    const { initialState } = Reducer;
    const action = new Actions.featureIsLoaded();

    const state = Reducer.UiReducer(initialState, action);
    expect(state.featureIsLoading).toEqual(true);
  });

});
