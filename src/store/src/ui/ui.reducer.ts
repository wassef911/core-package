import { UiActions, UiActionTypes } from './ui.action';

export interface UiState {
  featureIsLoading: boolean;
}

export const initialState: UiState = {
  featureIsLoading: true,
};

export function UiReducer(state = initialState, action: UiActions): UiState {
  switch (action.type) {
    case UiActionTypes.featureIsLoading: {
      return Object.assign({}, state, { ...state, featureIsLoading: true });
    }
    case UiActionTypes.featureIsLoaded: {
      return Object.assign({}, state, { ...state, featureIsLoading: false });
    }

    default:
      return state;
  }
}

//export const getSelectedMuni = (state: UiActionTypes) => state.selectedMuni;
