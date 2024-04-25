import { createAction, props } from '@ngrx/store';
import {
  BoardsData,
  IBoard,
  IColumn,
  ITask,
} from '../common/models/board.model';

export const enum BoardActionTypes {
  LOAD_BOARDS = '[Board] Load Boards',
  LOAD_BOARDS_SUCCESS = '[Board] Load Boards Success',

  LOAD_BOARD_COLUMNS = '[Board] Load Board Columns',
  LOAD_BOARD_COLUMNS_SUCCESS = '[Board] Load Board Columns Success',

  MOVE_TASK = '[Board] Move Task',
  MOVE_TASK_SUCCESS = '[Board] Move Task Success',

  CREATE_BOARD = '[Board] Create Board',
  CREATE_BOARD_SUCCESS = '[Board] Create Board Success',

  UPDATE_BOARD = '[Board] Update Board',
  UPDATE_BOARD_SUCCESS = '[Board] Update Board Success',

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

export const createBoard = createAction(
  BoardActionTypes.CREATE_BOARD,
  props<{ board: IBoard }>()
);
export const createBoardSuccess = createAction(
  BoardActionTypes.CREATE_BOARD_SUCCESS,
  props<{ board: IBoard }>()
);

export const updateBoard = createAction(
  BoardActionTypes.UPDATE_BOARD,
  props<{ board: IBoard }>()
);
export const updateBoardSuccess = createAction(
  BoardActionTypes.UPDATE_BOARD_SUCCESS,
  props<{ board: IBoard }>()
);

/** Global Actions**/
export const failure = createAction(
  BoardActionTypes.FAILURE,
  props<{ errors: string | any }>()
);
