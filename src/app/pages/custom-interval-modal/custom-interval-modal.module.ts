import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomIntervalModalPageRoutingModule } from './custom-interval-modal-routing.module';

import { CustomIntervalModalPage } from './custom-interval-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomIntervalModalPageRoutingModule
  ],
  declarations: [CustomIntervalModalPage]
})
export class CustomIntervalModalPageModule {}
