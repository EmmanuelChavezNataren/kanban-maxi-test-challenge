import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class MainHeaderComponent {
  /** Indicates if menu button has to be displayed   */
  @Input() hasMenuBtn: boolean = false;
  /** Title of main page, has to be passed as string */
  @Input({ required: true }) title!: string;

  /** Indicates if action button (icon and text) has to be displayed */
  @Input() hasActionable: boolean = false;
  /** text of actionable button */
  @Input() txtActionable: string = 'Add';
  /** Icon of actionable button */
  @Input() iconActionable: string = 'add';

  /** Indicates if options button has to be displayed */
  @Input() hasIconBtn: boolean = true;
  /** icon of actionable button */
  @Input() iconBtn: string = 'ellipsis-vertical';

  /** Event emitted when actionable button is clicked */
  @Output() actionClick = new EventEmitter<void>();
  /** Event emmited when icon button is clicked */
  @Output() iconClick = new EventEmitter<void>();

  constructor() {}

  /**
   * UI Events
   */

  onactionClick() {
    this.actionClick.emit();
  }
  oniconClick() {
    this.iconClick.emit();
  }
}
