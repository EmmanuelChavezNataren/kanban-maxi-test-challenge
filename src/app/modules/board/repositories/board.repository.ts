import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment';
import { IRepository } from '@shared/contracts';
import { StorageItems } from '@shared/enums';
import { StorageHelper } from '@shared/helpers';
import { Observable, map, of } from 'rxjs';
import {
  BoardsData,
  IBoard,
  IColumn,
  ITask,
} from '../common/models/board.model';

@Injectable()
export class BoardRepository extends IRepository {
  //Urls
  readonly #localBoardsUrl = `${environment.apiUrl}/assets/mocks/data.json`;
  readonly #boardsUrl = `${environment.apiUrl}/v1/boards`;

  //Injects
  readonly #storage = inject(StorageHelper);

  boards: BoardsData;

  constructor() {
    super();
  }

  getBoards(): Observable<BoardsData> {
    return this.httpGet<BoardsData>(this.#boardsUrl);
  }

  getBoardColumns(boardName: string): Observable<IColumn[]> {
    const board = [...this.boards].find((b) => b.name === boardName);
    return of(board ? board.columns : []);
  }

  async getStoredBoards(): Promise<BoardsData> {
    return await this.#storage.getObject<BoardsData>(StorageItems.Boards);
  }

  loadPreloadedBoards(): Observable<BoardsData> {
    return this.http
      .get<{ boards: BoardsData }>(this.#localBoardsUrl)
      .pipe(map((response) => response.boards));
  }

  saveBoards(boardsData: BoardsData): void {
    this.#storage.set(StorageItems.Boards, JSON.stringify(boardsData));
  }

  moveTask(selectedTask: ITask, selectedColumn: IColumn) {
    let boardsCopy = [...this.boards];
    const boardFromIndex = [...boardsCopy].findIndex((board: IBoard) =>
      board.columns.some((column: IColumn) =>
        column.tasks.some(
          (task: ITask) => JSON.stringify(task) === JSON.stringify(selectedTask)
        )
      )
    );

    // Find the column that contains the task
    const columnFromIndex = [...boardsCopy][boardFromIndex].columns.findIndex(
      (column) =>
        column.tasks.some(
          (task) => JSON.stringify(task) === JSON.stringify(selectedTask)
        )
    );
    // Find the index of the task in the column
    const taskFromIndex = [...boardsCopy][boardFromIndex].columns[
      columnFromIndex
    ].tasks.findIndex(
      (task) => JSON.stringify(task) === JSON.stringify(selectedTask)
    );
    // Copy of the task
    const taskCopy: ITask = {
      ...selectedTask,
      status: selectedColumn.name,
    };
    // Remove the task from the original column
    let taskFrom = [
      ...boardsCopy[boardFromIndex].columns[columnFromIndex].tasks,
    ];
    taskFrom.splice(taskFromIndex, 1);
    boardsCopy[boardFromIndex].columns[columnFromIndex].tasks;

    // Add the task to the new column
    let newColumn = boardsCopy[boardFromIndex].columns.find(
      (column) => JSON.stringify(column) === JSON.stringify(selectedColumn)
    );
    let tasksTo = [...newColumn.tasks];
    tasksTo.push(taskCopy);
    newColumn.tasks = [...tasksTo];

    //updating data in storage
    this.boards = [...boardsCopy];
    this.saveBoards([...boardsCopy]);
    return of({
      updatedBoards: [...boardsCopy],
      updatedColumns: [...boardsCopy[boardFromIndex].columns],
    });
  }
}
