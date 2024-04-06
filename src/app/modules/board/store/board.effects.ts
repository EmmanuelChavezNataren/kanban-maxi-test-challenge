import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackbarHelper, UtilsHelper } from '@shared/helpers';
import { catchError, exhaustMap, from, map, mergeMap, of, switchMap } from 'rxjs';
import { BoardRepository } from '../repositories/board.repository';
import * as fromActions from './board.actions';

@Injectable({
  providedIn: 'root',
})
export class BoardEffects {
  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.BoardActionTypes.LOAD_BOARDS),
      exhaustMap(() => {
        if (environment.useLocalStorage) {
          return from(this.boardRepo.getStoredBoards()).pipe(
            switchMap((storedData) => {
              if (storedData?.length) {
                this.utils.dismissLoading();
                return of(
                  fromActions.loadBoardsSuccess({
                    boards: storedData,
                  })
                );
              }
              return this.boardRepo.loadPreloadedBoards().pipe(
                map((preloadedBoards) => {
                  this.utils.dismissLoading();
                  this.boardRepo.saveBoards(preloadedBoards);
                  return fromActions.loadBoardsSuccess({
                    boards: preloadedBoards,
                  });
                }),
                catchError(({ error }: any) => {
                  this.utils.dismissLoading();
                  this.snackbar.failure({ message: error });
                  return of(fromActions.failure({ errors: error }));
                })
              );
            })
          );
        }
        return this.boardRepo.getBoards().pipe(
          map((boards) => {
            this.utils.dismissLoading();
            return fromActions.loadBoardsSuccess({ boards });
          }),
          catchError(({ error }: any) => {
            this.utils.dismissLoading();
            this.snackbar.failure({ message: error });
            return of(fromActions.failure({ errors: error }));
          })
        );
      })
    )
  );

  loadBoardColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.BoardActionTypes.LOAD_BOARD_COLUMNS),
      mergeMap(({ boardName }) => {
        return this.boardRepo.getBoardColumns(boardName).pipe(
          map((columns) => {
            this.utils.dismissLoading();
            return fromActions.loadBoardColumnsSuccess({ columns });
          }),
          catchError((error) => {
            this.utils.dismissLoading();
            this.snackbar.failure({ message: error });
            return of(fromActions.failure({ errors: error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private boardRepo: BoardRepository,
    private snackbar: SnackbarHelper,
    private utils: UtilsHelper
  ) {}
}
