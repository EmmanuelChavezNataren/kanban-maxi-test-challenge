import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '@components/logo/logo.component';
import { ThemeSwitcherComponent } from '@components/theme-switcher/theme-switcher.component';
import { IonicModule, MenuController } from '@ionic/angular';

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
  @Input() readBoards!: string[];
  @Input() activeBoard!: string;

  @Output() addBoard = new EventEmitter<void>();
  @Output() selectedBoard = new EventEmitter<string>();

  //Injects
  #menu = inject(MenuController);

  /**
   * UI Events
   */

  hideSideMenu() {
    this.#menu.close();
  }

  add() {
    this.addBoard.emit();
  }

  selectBoard(board: string) {
    this.selectedBoard.emit(board);
  }
}
