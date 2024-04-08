import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment';
import { IRepository } from '@shared/contracts';
import { StorageItems } from '@shared/enums';
import { StorageHelper } from '@shared/helpers';
import { Observable, map, of } from 'rxjs';
import { BoardsData, IColumn } from '../common/models/board.model';

@Injectable()
export class BoardRepository extends IRepository {
  //Urls
  readonly #localBoardsUrl = `${environment.apiUrl}/assets/mocks/data.json`;
  readonly #boardsUrl = `${environment.apiUrl}/v1/boards`;

  //Injects
  readonly #storage = inject(StorageHelper);

  #boards: BoardsData = [];

  constructor() {
    super();
  }

  getBoards(): Observable<BoardsData> {
    return this.httpGet<BoardsData>(this.#boardsUrl);
  }

  getBoardColumns(boardName: string): Observable<IColumn[]> {
    const board = this.#boards.find((b) => b.name === boardName);
    return of(board ? board.columns : []);
  }

  async getStoredBoards(): Promise<BoardsData> {
    return await this.#storage.getObject<BoardsData>(StorageItems.Boards);
  }

  loadPreloadedBoards(): Observable<BoardsData> {
    return this.http.get<{ boards: BoardsData }>(this.#localBoardsUrl).pipe(
      map(response => {
        this.#boards = response.boards;
        return response.boards;
      })
    );
  }

  saveBoards(boardsData: BoardsData): void {
    this.#storage.set(StorageItems.Boards, JSON.stringify(boardsData));
  }
}
