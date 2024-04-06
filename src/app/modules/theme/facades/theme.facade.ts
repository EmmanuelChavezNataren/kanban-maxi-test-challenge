import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromActions from '../store/theme.actions';
import * as fromSelectors from '../store/theme.selectors';

@Injectable({
  providedIn: 'root',
})
export class ThemeFacade {
  readonly #store = inject(Store);

  get isDarkMode$(): Observable<boolean> {
    return this.#store.select(fromSelectors.selectDarkMode);
  }

  initializeTheme(savedTheme: boolean): void {
    return this.#store.dispatch(fromActions.loadTheme({ savedTheme }));
  }
  toggleTheme(): void {
    return this.#store.dispatch(fromActions.toggleTheme());
  }
}
