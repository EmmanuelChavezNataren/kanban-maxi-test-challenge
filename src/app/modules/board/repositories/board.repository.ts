import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment';
import { IRepository } from '@shared/contracts';
import { StorageItems } from '@shared/enums';
import { StorageHelper } from '@shared/helpers';
import { Observable, map, of } from 'rxjs';
import { BoardAdapter } from '../adapters/board.adapter';
import {
  BoardsData,
  IBoard,
  IColumn,
  ITask,
} from '../common/models/board.model';

@Injectable()
export class BoardRepository extends IRepository {
  boards: BoardsData;

  //Urls
  readonly #localBoardsUrl = `${environment.apiUrl}/assets/mocks/data.json`;
  readonly #boardsUrl = `${environment.apiUrl}/v1/boards`;
  //Injects
  readonly #storage = inject(StorageHelper);
  readonly #adapter = inject(BoardAdapter);
  constructor() {
    super();
  }

  getBoards(): Observable<BoardsData> {
    return this.httpGet<BoardsData>(this.#boardsUrl).pipe(
      map((boards) => this.#adapter.addUniqueIdToBoard(boards))
    );
  }

  getBoardColumns(boardId: string): Observable<IColumn[]> {
    const board = [...this.boards].find((b) => b.id === boardId);
    return of(board ? board.columns : []);
  }

  getStoredBoards(): Observable<BoardsData> {
    return new Observable<BoardsData>((observer) => {
      this.#storage
        .getObject<BoardsData>(StorageItems.Boards)
        .then((boards) => {
          if (boards?.length) {
            for (let board of boards) {
              if (!('id' in board)) {
                const boardsAdap = this.#adapter.addUniqueIdToBoard(boards);
                this.saveBoards(boardsAdap);
                observer.next(boardsAdap);
                observer.complete();
                return;
              }
            }
          }
          observer.next(boards);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  loadPreloadedBoards(): Observable<BoardsData> {
    return this.http.get<{ boards: BoardsData }>(this.#localBoardsUrl).pipe(
      map((response) => {
        for (let board of response.boards) {
          if (!('id' in board)) {
            return this.#adapter.addUniqueIdToBoard(response.boards);
          }
        }
        return response.boards;
      })
    );
  }

  saveBoards(boardsData: BoardsData): void {
    this.#storage.set(StorageItems.Boards, JSON.stringify(boardsData));
  }

  moveTask(selectedTask: ITask, selectedColumn: IColumn) {
    // Copy of the task
    const taskCopy: ITask = {
      ...selectedTask,
      status: selectedColumn.id,
    };

    // Remove the task from the original column
    const updateBoards: BoardsData = this.boards.map((board: IBoard) => {
      return {
        ...board,
        columns: board.columns.map((column: IColumn) => {
          return {
            ...column,
            tasks: [...column.tasks].filter((task: ITask) => {
              return task.id !== selectedTask.id;
            }),
          };
        }),
      };
    });

    // Add the task to the new column
    const newBoards: BoardsData = updateBoards.map((board: IBoard) => {
      return {
        ...board,
        columns: board.columns.map((column: IColumn) => {
          if (column.id === selectedColumn.id) {
            column.tasks.push(taskCopy);
          }
          return column;
        }),
      };
    });

    //updating data in storage
    this.saveBoards(newBoards);
    return of({
      updatedBoards: newBoards,
    });
  }

  createBoard(board: IBoard): Observable<IBoard> {
    return new Observable<IBoard>((observer) => {
      this.#storage
        .getObject<BoardsData>(StorageItems.Boards)
        .then((boards) => {
          const newBoards: BoardsData = [...boards, board];
          this.saveBoards(newBoards);
          observer.next(board);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  updateBoard(board: IBoard): Observable<IBoard> {
    const params = this.fetchParams(board);
    return this.httpPost<IBoard>(`${this.#boardsUrl}/${board.id}`, params);
  }
}
