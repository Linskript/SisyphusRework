import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-custom-interval-modal',
  templateUrl: './custom-interval-modal.page.html',
  styleUrls: ['./custom-interval-modal.page.scss'],
})
export class CustomIntervalModalPage {
  intervalName: string = '';
  intervalDescription: string = '';

  constructor(private modalController: ModalController, private navParams: NavParams) {}

  closeModal() {
    this.modalController.dismiss();
  }

  saveInterval() {
    if (this.intervalName && this.intervalDescription) {
      const data = {
        name: this.intervalName,
        description: this.intervalDescription,
      };
      this.modalController.dismiss(data);
    }
  }
}
