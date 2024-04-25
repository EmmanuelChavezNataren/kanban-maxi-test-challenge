import { Injectable } from '@angular/core';
import {
  BoardsData,
  IBoard,
  IColumn,
  ISubtask,
  ITask,
} from '../common/models/board.model';

@Injectable()
export class BoardAdapter {
  constructor() {}

  addUniqueIdToBoard(boards: Partial<BoardsData>): BoardsData {
    boards.forEach((board: IBoard) => {
      board.id = crypto.randomUUID();
      board.columns.forEach((column: IColumn) => {
        column.id = crypto.randomUUID();
        column.tasks.forEach((task: ITask) => {
          task.id = crypto.randomUUID();
          task.subtasks?.forEach((subtask: ISubtask) => {
            subtask.id = crypto.randomUUID();
          });
        });
      });
    });
    return boards;
  }

  addIdToCreateBoard(board: IBoard): IBoard {
    board.id = crypto.randomUUID();
    board.columns.forEach((column: IColumn) => {
      column.id = crypto.randomUUID();
      column.tasks.forEach((task: ITask) => {
        task.id = crypto.randomUUID();
        task.subtasks?.forEach((subtask: ISubtask) => {
          subtask.id = crypto.randomUUID();
        });
      });
    });
    return board;
  }
}
