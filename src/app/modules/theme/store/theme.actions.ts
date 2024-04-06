import { createAction, props } from '@ngrx/store';

export const enum ThemeActionTypes {
  LOAD_THEME = '[Theme] Init theme',
  TOGGLE_THEME = '[Theme] Toggle',
}

export const loadTheme = createAction(
  ThemeActionTypes.LOAD_THEME,
  props<{ savedTheme: boolean }>()
);
export const toggleTheme = createAction(ThemeActionTypes.TOGGLE_THEME);
