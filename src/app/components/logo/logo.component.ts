import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-logo',
  styleUrls: ['./logo.component.scss'],
  imports: [IonicModule],
  standalone: true,
  template: `<ion-header class="ion-no-border ion-padding-horizontal">
    <ion-toolbar class="bg-transparent ion-no-padding">
      <ion-icon slot="start" size="large" [src]="'assets/icon/svg/kanban-3.svg'" />
      <ion-title slot="start" class="ion-no-padding fz-24">Kanban</ion-title>
    </ion-toolbar>
  </ion-header> `,
})
export class LogoComponent {}
