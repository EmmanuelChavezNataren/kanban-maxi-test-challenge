import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';

import { IFacade } from '@shared/contracts';
import {
  BoardsData,
  IBoard,
  IColumn,
  ITask,
} from '../common/models/board.model';
import * as fromActions from '../store/board.actions';
import * as fromSelectors from '../store/board.selectors';

@Injectable()
export class BoardFacade implements IFacade<BoardsData, boolean> {
  #store = inject(Store);

  get isLoading$(): Observable<boolean> {
    return this.#store.select(fromSelectors.selectIsLoading);
  }
  get succeeded$(): Observable<boolean> {
    return this.#store.select(fromSelectors.selectSucceeded);
  }
  get hasError$(): Observable<boolean> {
    return this.#store.select(fromSelectors.selectHasError);
  }
  get error$(): Observable<string> {
    return this.#store.select(fromSelectors.selectErrorMessage);
  }
  get data$(): Observable<BoardsData> {
    return this.#store
      .select(fromSelectors.selectBoards)
      .pipe(filter((x) => !!x));
  }
  get activeBoard$(): Observable<IBoard> {
    return this.#store.select(fromSelectors.selectActiveBoard);
  }

  getBoards(): void {
    return this.#store.dispatch(fromActions.loadBoards());
  }
  getBoardColumns(boardId: string): void {
    return this.#store.dispatch(fromActions.loadBoardColumns({ boardId }));
  }
  moveTask(task: ITask, column: IColumn): void {
    return this.#store.dispatch(fromActions.moveTask({ task, column }));
  }
}
