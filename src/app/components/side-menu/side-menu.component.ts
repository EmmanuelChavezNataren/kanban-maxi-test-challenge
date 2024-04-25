import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '@components/logo/logo.component';
import { ThemeSwitcherComponent } from '@components/theme-switcher/theme-switcher.component';
import { IonicModule, MenuController } from '@ionic/angular';
import { IBoard, IReadBoard } from '@modules/board';
import { ThemeProvider } from '@modules/theme';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    LogoComponent,
    ThemeSwitcherComponent,
  ],
})
export class SideMenuComponent {
  @Input() readBoards!: IReadBoard[];
  @Input() activeBoard!: IBoard;

  @Output() addBoard = new EventEmitter<void>();
  @Output() selectedBoard = new EventEmitter<string>();
  @Output() hideSideMenu = new EventEmitter<boolean>();

  isDarkMode$: Observable<boolean>;

  //Injects
  #menuCtrl = inject(MenuController);
  #themeProv = inject(ThemeProvider);
  constructor() {
    this.isDarkMode$ = this.#themeProv.state.isDarkMode$;
  }

  /**
   * UI Events
   */

  closeSideMenu() {
    this.#menuCtrl.enable(false, 'first-menu');
    this.#menuCtrl.close('first-menu');
    this.hideSideMenu.emit(true);
  }

  add() {
    this.addBoard.emit();
  }

  selectBoard(boardId: string) {
    this.selectedBoard.emit(boardId);
  }
}
