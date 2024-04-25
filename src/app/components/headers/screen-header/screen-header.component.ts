import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-screen-header',
  templateUrl: './screen-header.component.html',
  styleUrls: ['../main-header/main-header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ScreenHeaderComponent {
  /** Title of screen page, has to be passed as string */
  @Input({ required: true }) title!: string;
  /** Indicated if page has to have back button, default: true */
  @Input() hasBack: boolean = true;
  /** Indicated if page has to have back button custom */
  @Input() hasCustomBack: boolean;
  /** Indicates if the header toolbar has a background */
  @Input() hasBackgroundToolbar = true;

  /** Indicates if action button (icon and text) has to be displayed */
  @Input() hasActionable: boolean = false;
  /** text of actionable button */
  @Input() txtActionable: string = 'Add';
  /** Icon of actionable button */
  @Input() iconActionable: string = 'add';

  /** Indicates if options button has to be displayed */
  @Input() hasIconBtn: boolean = true;
  /** Icon of button icon-only */
  @Input() iconBtn: string = 'ellipsis-vertical';

  /** Event emitted when actionable button is clicked */
  @Output() actionClick = new EventEmitter<void>();
  /** Event emmited when icon button is clicked */
  @Output() iconClick = new EventEmitter<void>();
  /** event emitted when back button is clicked when has custom back */
  @Output() backClick = new EventEmitter<void>();

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  /**
   * UI Events
   */

  onactionClick() {
    this.actionClick.emit();
  }
  async oniconClick() {
    if (await this.modalCtrl.getTop()) {
      this.modalCtrl.dismiss({});
    } else {
      this.iconClick.emit();
    }
  }

  async back() {
    if (await this.modalCtrl.getTop()) {
      this.modalCtrl.dismiss({});
    } else if (this.hasCustomBack) {
      this.backClick.emit();
    } else {
      this.navCtrl.back();
    }
  }
}
