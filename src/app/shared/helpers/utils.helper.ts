import { Injectable, inject } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class UtilsHelper {
  #loadingCtrl = inject(LoadingController);

  async presentLoading(message: string = 'Cargando datos...') {
    const loading = await this.#loadingCtrl.create({
      message,
      backdropDismiss: false,
      showBackdrop: true,
      duration: 8000, // avoid getting stuck in loading
      mode: 'md',
    });

    loading.present();
  }

  dismissLoading() {
    this.#loadingCtrl.dismiss().then().catch(console.warn);
  }
}
