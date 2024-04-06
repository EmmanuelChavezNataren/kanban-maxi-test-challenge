import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './theme.reducer';

/** State **/
const selectState = createFeatureSelector<fromReducer.State>(
  fromReducer.featureKey
);

/** Data **/
export const selectDarkMode = createSelector(selectState, ({ darkMode }) => darkMode);
