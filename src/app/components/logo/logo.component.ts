import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-logo',
  styleUrls: ['./logo.component.scss'],
  imports: [IonicModule],
  standalone: true,
  template: `<ion-header class="ion-no-border">
    <ion-toolbar class="bg-transparent ion-padding-horizontal">
      <ion-icon
        slot="start"
        size="large"
        [src]="'assets/icon/svg/kanban-3.svg'"
      ></ion-icon>
      <ion-title class="ion-no-padding fz-24">Kanban</ion-title>
    </ion-toolbar>
  </ion-header> `,
})
export class LogoComponent {}
