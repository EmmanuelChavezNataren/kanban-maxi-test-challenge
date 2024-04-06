import { createAction, props } from '@ngrx/store';
import { BoardsData, IColumn } from '../common/models/board.model';

export const enum BoardActionTypes {
  LOAD_BOARDS = '[Board] Load Boards',
  LOAD_BOARDS_SUCCESS = '[Board] Load Boards Success',

  LOAD_BOARD_COLUMNS = '[Board] Load Board Columns',
  LOAD_BOARD_COLUMNS_SUCCESS = '[Board] Load Board Columns Success',

  /** Global Types**/
  FAILURE = '[Board] Failure',
}

export const loadBoards = createAction(BoardActionTypes.LOAD_BOARDS);
export const loadBoardsSuccess = createAction(
  BoardActionTypes.LOAD_BOARDS_SUCCESS,
  props<{ boards: BoardsData }>()
);

export const loadBoardColumns = createAction(
  BoardActionTypes.LOAD_BOARD_COLUMNS,
  props<{ boardName: string }>()
);
export const loadBoardColumnsSuccess = createAction(
  BoardActionTypes.LOAD_BOARD_COLUMNS_SUCCESS,
  props<{ columns: IColumn[] }>()
);

/** Global Actions**/
export const failure = createAction(
  BoardActionTypes.FAILURE,
  props<{ errors: string | any }>()
);
