import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BoardProvider, IColumn } from '@modules/board';
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

  activeBoard$: Observable<string>;
  boardColumns$: Observable<IColumn[]>;

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
    this.boardColumns$ = this.#boardProv.state.boardColumns$;
  }

  onPositionChange({ task, column }) {
    this.#boardProv.moveTask(task, column);
  }
}
