import { Injectable, inject } from '@angular/core';
import { UtilsHelper } from '@shared/helpers';
import { Observable, map } from 'rxjs';
import { BoardFacade } from '../facades/board.facade';

@Injectable()
export class BoardProvider {
  #facade = inject(BoardFacade);
  #utils = inject(UtilsHelper);

  get state(): BoardFacade {
    return this.#facade;
  }
  get readBoard$(): Observable<string[]> {
    return this.state.data$.pipe(
      map((boards) => boards.map((board) => board.name))
    );
  }

  getBoards(): void {
    this.#utils.presentLoading().then(() => {
      this.state.getBoards();
    });
  }

  getBoardColumns(boardName: string): void {
    this.#utils.presentLoading().then(() => {
      this.state.getBoardColumns(boardName);
    });
  }
}
