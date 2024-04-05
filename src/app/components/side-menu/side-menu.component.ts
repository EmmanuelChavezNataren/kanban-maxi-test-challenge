import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '@components/logo/logo.component';
import { IonicModule, MenuController, ModalController } from '@ionic/angular';
import { PathNames } from '@shared/enums';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, LogoComponent],
})
export class SideMenuComponent {
  //Injects
  #modalCtrl = inject(ModalController);
  #menu = inject(MenuController);

  #totalBoard: number = 0;

  selectedIndex: number = 0;
  appPages = [
    { title: 'Platform Launch', url: PathNames.dashboard },
    { title: 'Marketing Plan', url: '' },
    { title: '+ Create New Board', url: '', hasButtonAdd: true },
  ];
  listTitle: string = `ALL BOARDS (${this.#totalBoard})`;

  /**
   * UI Events
   */

  openAddNewBoard() {
    //TODO open modal to add new board
  }

  hideSideMenu() {
    this.#menu.close();
  }

  setSelectedIndex(selectedIndex: number) {
    this.selectedIndex = selectedIndex;
  }
}
