import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { StorageItems } from '@shared/enums';
import { StorageHelper } from '@shared/helpers';
import { tap } from 'rxjs';
import * as fromActions from './theme.actions';
import * as fromReducer from './theme.reducer';
import * as fromSelector from './theme.selectors';

@Injectable({
  providedIn: 'root',
})
export class ThemeEffects {
  saveTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.ThemeActionTypes.TOGGLE_THEME),
        tap((value) => {
          this.store$
            .pipe(select(fromSelector.selectDarkMode))
            .subscribe((dark) => {
              this.storage.set(StorageItems.DarkMode, dark);
              document.body.classList.toggle('dark', dark);
            });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducer.State>,
    private storage: StorageHelper
  ) {}
}
