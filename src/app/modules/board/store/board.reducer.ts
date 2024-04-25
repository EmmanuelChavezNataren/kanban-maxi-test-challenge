import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IState } from '@shared/contracts';
import { BoardsData, IBoard } from '../common/models/board.model';
import * as fromActions from './board.actions';

export const featureKey = 'board';

export interface State extends IState<BoardsData> {
  activeBoard: IBoard;
}

export const initialState: State = {
  hasError: false,
  errorMessage: null,
  data: [],
  isLoading: false,
  succeeded: false,
  activeBoard: null,
};

export const boardReducer: ActionReducer<State> = createReducer(
  initialState,
  on(
    fromActions.loadBoards,
    (state): State => ({
      ...state,
      isLoading: true,
      activeBoard: null,
    })
  ),
  on(
    fromActions.loadBoardColumns,
    (state, { boardId }): State => ({
      ...state,
      isLoading: true,
      activeBoard: {
        ...state.activeBoard,
        id: boardId,
      },
    })
  ),
  on(
    fromActions.moveTask,
    fromActions.createBoard,
    fromActions.updateBoard,
    (state): State => ({
      ...state,
      isLoading: true,
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
      activeBoard: boards[0],
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
      activeBoard: {
        ...state.activeBoard,
        columns: [...columns],
      },
    })
  ),
  on(
    fromActions.moveTaskSuccess,
    (state, { updatedBoards }): State => ({
      ...state,
      isLoading: false,
      succeeded: true,
      hasError: false,
      errorMessage: null,
      data: [...updatedBoards],
      activeBoard: {
        ...(updatedBoards.find(
          (board: IBoard) => board.id === state.activeBoard.id
        ) ?? state.activeBoard),
      },
    })
  ),
  on(
    fromActions.createBoardSuccess,
    (state, { board }): State => ({
      ...state,
      isLoading: false,
      succeeded: true,
      data: [...state.data, board],
    })
  ),
  on(
    fromActions.updateBoardSuccess,
    (state, { board }): State => ({
      ...state,
      isLoading: false,
      succeeded: true,
      data: [
        ...state.data.map((data) => {
          if (data.id === board.id) {
            return { ...board };
          }
          return { ...data };
        }),
      ],
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
