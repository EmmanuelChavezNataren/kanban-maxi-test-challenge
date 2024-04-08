import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from '../store/board.reducer';

const selectState = createFeatureSelector<fromReducer.State>(
  fromReducer.featureKey
);

/** Default **/
export const selectIsLoading = createSelector(
  selectState,
  ({ isLoading }) => isLoading
);
export const selectSucceeded = createSelector(
  selectState,
  ({ succeeded }) => succeeded
);
export const selectHasError = createSelector(
  selectState,
  ({ hasError }) => hasError
);
export const selectErrorMessage = createSelector(
  selectState,
  ({ errorMessage }) => errorMessage
);
/** Data **/
export const selectBoards = createSelector(selectState, ({ data }) => data);
export const selectColumns = createSelector(
  selectState,
  ({ columns }) => columns
);
export const selectActiveBoard = createSelector(
  selectState,
  ({ activeBoardName }) => activeBoardName
);
