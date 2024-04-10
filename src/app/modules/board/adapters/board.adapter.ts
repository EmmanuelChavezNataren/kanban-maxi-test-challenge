import { Injectable, inject } from '@angular/core';
import { StorageItems } from '@shared/enums';
import { StorageHelper } from '@shared/helpers';
import {
  BoardsData,
  IBoard,
  IColumn,
  ISubtask,
  ITask,
} from '../common/models/board.model';

@Injectable()
export class BoardAdapter {
  readonly #storage = inject(StorageHelper);
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
}
