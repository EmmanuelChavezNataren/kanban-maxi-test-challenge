import { Injectable, inject } from '@angular/core';
import { StorageItems } from '@shared/enums';
import { StorageHelper } from '@shared/helpers';
import { ThemeFacade } from '../facades/theme.facade';

@Injectable({
  providedIn: 'root',
})
export class ThemeProvider {
  #facade = inject(ThemeFacade);
  #storage = inject(StorageHelper);

  get state(): ThemeFacade {
    return this.#facade;
  }

  async initializeTheme() {
    const savedTheme = !!(await this.#storage.getObject(StorageItems.DarkMode));
    this.state.initializeTheme(savedTheme);
  }

  toggleTheme(): void {
    this.state.toggleTheme();
  }
}
