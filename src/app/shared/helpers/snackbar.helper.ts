import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SnackbarHelper {
  #toastEl: HTMLIonToastElement;

  readonly defaultOptions: ToastOptions = {
    position: 'top',
    mode: 'md',
    htmlAttributes: {
      positionAnchor: 'mainHeader',
    },
  };

  constructor(private toastCtrl: ToastController) {}

  async info({ message = '', duration = 2000 }) {
    this.#toastEl?.remove();
    this.#toastEl = await this.toastCtrl.create({
      ...this.defaultOptions,
      message,
      cssClass: ['error', 'unsafe'],
      buttons: [
        {
          icon: 'close-circle-sharp',
          handler: () => {},
        },
      ],
    });
    this.#toastEl.present();
  }
  async success({ message = '', duration = 500000, showCloseBtn = true }) {
    this.#toastEl?.remove();
    this.#toastEl = await this.toastCtrl.create({
      ...this.defaultOptions,
      message,
      cssClass: 'success',
      duration,
      buttons: showCloseBtn
        ? [
            {
              icon: 'close-circle-sharp',
              handler: () => {},
            },
          ]
        : [],
    });
    this.#toastEl.present();
  }
  async failure({
    message = 'Ocurrió un error, inténtalo nuevamente',
    duration = 3000,
    showCloseBtn = true,
  }) {
    this.#toastEl?.remove();
    this.#toastEl = await this.toastCtrl.create({
      message,
      cssClass: ['error', 'unsafe'],
      duration,
      buttons: showCloseBtn
        ? [
            {
              icon: 'close-circle-sharp',
              handler: () => {},
            },
          ]
        : [],
    });
    this.#toastEl.present();
  }
}
