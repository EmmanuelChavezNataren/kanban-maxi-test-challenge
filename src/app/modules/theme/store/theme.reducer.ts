import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as fromActions from './theme.actions';

export const featureKey = 'theme';

export interface State {
  darkMode: boolean;
}

const initialState: State = {
  darkMode: true,
};

export const themeReducer: ActionReducer<State> = createReducer(
  initialState,
  on(
    fromActions.loadTheme,
    (state, action): State => ({
      ...state,
      darkMode: action.savedTheme !== null ? action.savedTheme : state.darkMode,
    })
  ),
  on(
    fromActions.toggleTheme,
    (state): State => ({
      ...state,
      darkMode: !state.darkMode,
    })
  )
);

export const reducer = (state: State | undefined, action: Action) =>
  themeReducer(state, action);
