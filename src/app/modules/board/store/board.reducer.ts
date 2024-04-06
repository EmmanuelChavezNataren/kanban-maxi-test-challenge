import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IState } from '@shared/contracts';
import { BoardsData, IColumn } from '../common/models/board.model';
import * as fromActions from './board.actions';

export const featureKey = 'board';

export interface State extends IState<BoardsData> {
  activeBoardName: string;
  columns: IColumn[];
}

export const initialState: State = {
  hasError: false,
  errorMessage: null,
  data: [],
  isLoading: false,
  succeeded: false,
  activeBoardName: '',
  columns: [],
};

export const boardReducer: ActionReducer<State> = createReducer(
  initialState,
  on(
    fromActions.loadBoards,
    (state): State => ({
      ...state,
      isLoading: true,
      activeBoardName: '',
    })
  ),
  on(
    fromActions.loadBoardColumns,
    (state, { boardName }): State => ({
      ...state,
      isLoading: true,
      activeBoardName: boardName,
    })
  ),
  on(
    fromActions.loadBoardsSuccess,
    (state, { boards }): State => ({
      ...state,
      isLoading: false,
      succeeded: true,
      hasError: false,
      errorMessage: null,
      data: [...boards],
      activeBoardName: boards[0]?.name,
    })
  ),
  on(
    fromActions.loadBoardColumnsSuccess,
    (state, { columns }): State => ({
      ...state,
      isLoading: false,
      succeeded: true,
      hasError: false,
      errorMessage: null,
      columns: [...columns],
    })
  ),
  on(
    fromActions.failure,
    (state, { errors }): State => ({
      ...state,
      isLoading: false,
      succeeded: false,
      hasError: true,
      errorMessage: errors,
    })
  )
);

export const reducer = (state: State | undefined, action: Action) =>
  boardReducer(state, action);
