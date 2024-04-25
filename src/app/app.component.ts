import { Component, OnInit, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { StatusBar } from '@capacitor/status-bar';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import {
  BoardProvider,
  DefaultBoard,
  IBoard,
  IReadBoard,
} from '@modules/board';
import { ThemeProvider } from '@modules/theme';
import { BoardModalComponent } from '@pages/dashboard/components/modals/board-modal/board-modal.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  readBoards$: Observable<IReadBoard[]>;
  activeBoard$: Observable<IBoard>;

  canShowSideMenuBtn: boolean = false;

  //Injects
  #menuCtrl = inject(MenuController);
  #platform = inject(Platform);
  #themeProv = inject(ThemeProvider);
  #boardProv = inject(BoardProvider);
  #modalCtrl = inject(ModalController);
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

  onSelectBoard(boardId: string) {
    this.#boardProv.getBoardColumns(boardId);
  }

  async onAddBoard() {
    const boardInit: IBoard = { ...DefaultBoard };
    const modal = await this.#modalCtrl.create({
      component: BoardModalComponent,
      mode: 'ios',
      componentProps: { defaultBoard: boardInit },
      cssClass: ['custom'],
    });
    modal.present();
    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        console.log('Board Data ', data);
      }
    });
  }

  onHideSideMenu(isHidden: boolean) {
    if (!isHidden) {
      this.#menuCtrl.enable(true, 'first-menu');
      this.#menuCtrl.open('first-menu');
    }
    this.canShowSideMenuBtn = !this.canShowSideMenuBtn;
  }

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
      this.#menuCtrl.enable(true);
      return;
    }
    this.#menuCtrl.enable(false);
  }

  private initBoards() {
    this.readBoards$ = this.#boardProv.readBoard$;
    this.activeBoard$ = this.#boardProv.state.activeBoard$;

    this.#boardProv.getBoards();
  }
}
