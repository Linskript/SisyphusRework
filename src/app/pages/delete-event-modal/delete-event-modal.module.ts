import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteEventModalPageRoutingModule } from './delete-event-modal-routing.module';

import { DeleteEventModalPage } from './delete-event-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DeleteEventModalPageRoutingModule
  ],
  declarations: [DeleteEventModalPage]
})
export class DeleteEventModalPageModule {}
