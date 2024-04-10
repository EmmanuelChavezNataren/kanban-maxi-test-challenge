import { Component, OnInit, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { StatusBar } from '@capacitor/status-bar';
import { MenuController, Platform } from '@ionic/angular';
import { BoardProvider } from '@modules/board';
import { ThemeProvider } from '@modules/theme';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  //Injects
  #menu = inject(MenuController);
  #platform = inject(Platform);
  #themeProv = inject(ThemeProvider);
  #boardProv = inject(BoardProvider);

  readBoards$: Observable<string[]>;
  activeBoard$: Observable<string>;

  constructor() {
    this.initializeApp();
  }

  /**
   * Life Cycles
   */

  ngOnInit(): void {
    this.menuHandler();
  }

  /**
   * UI Events
   */

  private initializeApp() {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setBackgroundColor({ color: 'var(--ion-toolbar-background)' });
      Keyboard.hide();
    }
    this.#platform.ready().then(() => {
      this.initBoards();
      this.#themeProv.initializeTheme();
    });
  }

  private menuHandler() {
    const isAuthtenticated = true;
    /* !!(await this.#storageHelper.get('authToken')); */
    if (isAuthtenticated) {
      this.#menu.enable(true);
    }
    this.#menu.enable(false);
  }

  private initBoards() {
    this.readBoards$ = this.#boardProv.readBoard$;
    this.activeBoard$ = this.#boardProv.state.activeBoard$;

    this.#boardProv.getBoards();
  }

  onSelectBoard(boardName: string) {
    this.#boardProv.getBoardColumns(boardName);
  }

  onAddBoard() {

  }
}
