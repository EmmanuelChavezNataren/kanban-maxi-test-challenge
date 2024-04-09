import { Component, Input } from '@angular/core';
import { ISubtask, ITask } from '@modules/board';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: ITask;

  constructor() {}

  calculateCompleted(subtasks: ISubtask[]): number {
    return subtasks.filter((s) => s.isCompleted).length;
  }
}
