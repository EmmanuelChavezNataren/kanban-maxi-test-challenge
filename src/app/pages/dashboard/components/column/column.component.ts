import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IColumn, ITask } from '@modules/board';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column: IColumn;
  @Input() activeBoardIndex: number;
  @Output() positionChange = new EventEmitter<{
    task: ITask;
    column: IColumn;
  }>();

  colors = ['#49C4E5', '#8471F2', '#67E2AE'];

  constructor() {}

  getColor() {
    return this.colors[this.activeBoardIndex % this.colors.length];
  }

  drop(event: CdkDragDrop<ITask[]>, column: IColumn) {
    const readTask = event.item.data as ITask;
    const task: ITask = { ...readTask };

    if (event.previousContainer === event.container) {
      const tasksCopy = [...event.container.data];
      moveItemInArray(tasksCopy, event.previousIndex, event.currentIndex);
    } else {
      this.positionChange.emit({ task, column });
      const previousContainerCopy = [...event.previousContainer.data];
      const containerCopy = [...event.container.data];
      transferArrayItem(
        previousContainerCopy,
        containerCopy,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
