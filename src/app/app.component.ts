import { Component, OnInit, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { StatusBar } from '@capacitor/status-bar';
import { MenuController } from '@ionic/angular';
import { StorageHelper } from '@shared/helpers';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  //Injects
  #menu = inject(MenuController);
  #storageHelper = inject(StorageHelper);

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
  }

  private menuHandler() {
    const isAuthtenticated = true;
    /* !!(await this.#storageHelper.get('authToken')); */
    if (isAuthtenticated) {
      this.#menu.enable(true);
    }
    this.#menu.enable(false);
  }
}
