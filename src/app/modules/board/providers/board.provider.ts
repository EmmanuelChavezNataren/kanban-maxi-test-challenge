import { Injectable, inject } from '@angular/core';
import { UtilsHelper } from '@shared/helpers';
import { Observable, map } from 'rxjs';
import { BoardAdapter } from '../adapters/board.adapter';
import { IBoard, IReadBoard } from '../common/models/board.model';
import { BoardFacade } from '../facades/board.facade';

@Injectable()
export class BoardProvider {
  #facade = inject(BoardFacade);
  #utils = inject(UtilsHelper);
  #adapter = inject(BoardAdapter);

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

  createBoard(board: IBoard) {
    const boardData = this.#adapter.addIdToCreateBoard(board);
    this.#utils.presentLoading();
    this.state.createBoard(boardData);
  }

  updateBoard(board: IBoard) {
    this.#utils.presentLoading();
    this.state.updateBoard(board);
  }
}
