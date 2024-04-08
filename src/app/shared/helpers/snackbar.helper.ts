import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SnackbarHelper {
  private toastEl: HTMLIonToastElement;
  constructor(private toastCtrl: ToastController) { }

  async info({ message = '', duration = 2000 }) {
    this.toastEl?.remove();
    this.toastEl = await this.toastCtrl.create({
      message,
      cssClass: ['error', 'unsafe'],
      mode: 'md',
      duration,
      buttons: [
        {
          icon: 'close-circle-sharp',
          handler: () => { }
        }
      ]
    });
    this.toastEl.present();
  }
  async success({ message = '', duration = 2000, showCloseBtn = true }) {
    this.toastEl?.remove();
    this.toastEl = await this.toastCtrl.create({
      message,
      cssClass: 'success',
      position: 'top',
      mode: 'md',
      duration,
      buttons: showCloseBtn ? [
        {
          icon: 'close-circle-sharp',
          handler: () => { }
        }
      ] : []
    });
    this.toastEl.present();
  }
  async failure({ message = 'Ocurrió un error, inténtalo nuevamente', duration = 3000, showCloseBtn = true }) {
    this.toastEl?.remove();
    this.toastEl = await this.toastCtrl.create({
      message,
      cssClass: ['error', 'unsafe'],
      mode: 'md',
      duration,
      buttons: showCloseBtn ? [
        {
          icon: 'close-circle-sharp',
          handler: () => { }
        }
      ] : []
    });
    this.toastEl.present();
  }
}
