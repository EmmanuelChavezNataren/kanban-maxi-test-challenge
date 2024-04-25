import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { BoardProvider, IBoard } from '@modules/board';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  activeBoard$: Observable<IBoard>;

  #subs: Subscription = new Subscription();
  //Injects
  #menuCtrl = inject(MenuController);
  #boardProv = inject(BoardProvider);
  #modalCtrl = inject(ModalController);
  constructor() {}

  /**
   * Life Cycles
   */

  ngOnInit() {
    this.#menuCtrl.enable(true);
    this.subscribeData();
  }

  ngOnDestroy(): void {
    this.#subs.unsubscribe();
  }

  /**
   * UI Events
   */

  subscribeData(): void {
    this.activeBoard$ = this.#boardProv.state.activeBoard$;
  }

  onPositionChange({ task, column }) {
    this.#boardProv.state.moveTask(task, column);
  }
}
