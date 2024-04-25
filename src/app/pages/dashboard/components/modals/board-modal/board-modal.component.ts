import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BoardProvider, DefaultBoard, IBoard } from '@modules/board';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss'],
})
export class BoardModalComponent implements OnInit, OnDestroy {
  @Input() defaultBoard: IBoard = DefaultBoard;

  isEdit = false;
  board: IBoard;
  name!: FormControl<string>;

  #subs: Subscription = new Subscription();
  //Injects
  #modalCtrl = inject(ModalController);
  #boardProv = inject(BoardProvider);
  constructor() {
    this.board = this.defaultBoard;
    this.isEdit = !!this.board.name;
  }

  /**
   * Life Cycles
   */

  ngOnInit(): void {
    this.subscribeData();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.#subs.unsubscribe();
  }

  /**
   * UI Events
   */

  subscribeData() {
    this.#subs.add(
      this.#boardProv.state.onCreateBoardSuccess$.subscribe((value) => {
        if (value) {
          this.#modalCtrl.dismiss();
        }
      })
    );
  }

  onSaveBoard() {
    const boardReq: IBoard = {
      name: this.name.value,
      columns: [],
    };

    if (this.isEdit) {
      this.#boardProv.updateBoard(boardReq);
      return;
    }

    this.#boardProv.createBoard(boardReq);
  }

  addColumn() {}

  private initForm(): void {
    this.name = new FormControl(this.board.name || '', [
      Validators.required,
      Validators.minLength(3),
    ]);
  }
}
