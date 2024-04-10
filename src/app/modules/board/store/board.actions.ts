import { createAction, props } from '@ngrx/store';
import { BoardsData, IColumn, ITask } from '../common/models/board.model';

export const enum BoardActionTypes {
  LOAD_BOARDS = '[Board] Load Boards',
  LOAD_BOARDS_SUCCESS = '[Board] Load Boards Success',

  LOAD_BOARD_COLUMNS = '[Board] Load Board Columns',
  LOAD_BOARD_COLUMNS_SUCCESS = '[Board] Load Board Columns Success',

  MOVE_TASK = '[Board] Move Task',
  MOVE_TASK_SUCCESS = '[Board] Move Task Success',

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
  props<{ boardId: string }>()
);
export const loadBoardColumnsSuccess = createAction(
  BoardActionTypes.LOAD_BOARD_COLUMNS_SUCCESS,
  props<{ columns: IColumn[] }>()
);

export const moveTask = createAction(
  BoardActionTypes.MOVE_TASK,
  props<{ task: ITask; column: IColumn }>()
);
export const moveTaskSuccess = createAction(
  BoardActionTypes.MOVE_TASK_SUCCESS,
  props<{ updatedBoards: BoardsData }>()
);

/** Global Actions**/
export const failure = createAction(
  BoardActionTypes.FAILURE,
  props<{ errors: string | any }>()
);
