import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BoardProvider, IBoard } from '@modules/board';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  //Injects
  #menu = inject(MenuController);
  #boardProv = inject(BoardProvider);

  #subs: Subscription = new Subscription();

  activeBoard$: Observable<IBoard>;

  constructor() {}

  /**
   * Life Cycles
   */

  ngOnInit() {
    this.#menu.enable(true);
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
    this.#boardProv.moveTask(task, column);
  }
}
