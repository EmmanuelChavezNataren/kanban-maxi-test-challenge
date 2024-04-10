import { Injectable, inject } from '@angular/core';
import { UtilsHelper } from '@shared/helpers';
import { Observable, map } from 'rxjs';
import { IColumn, IReadBoard, ITask } from '../common/models/board.model';
import { BoardFacade } from '../facades/board.facade';

@Injectable()
export class BoardProvider {
  #facade = inject(BoardFacade);
  #utils = inject(UtilsHelper);

  get state(): BoardFacade {
    return this.#facade;
  }
  get readBoard$(): Observable<IReadBoard[]> {
    return this.state.data$.pipe(
      map((boards) =>
        boards.map((board): IReadBoard => ({ id: board.id, name: board.name }))
      )
    );
  }

  getBoards(): void {
    this.#utils.presentLoading();
    this.state.getBoards();
  }

  getBoardColumns(boardName: string): void {
    this.#utils.presentLoading();
    this.state.getBoardColumns(boardName);
  }

  moveTask(task: ITask, column: IColumn) {
    this.#utils.presentLoading('Updating data...');
    this.state.moveTask(task, column);
  }
}
