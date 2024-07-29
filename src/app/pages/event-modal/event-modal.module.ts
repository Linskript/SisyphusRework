import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventModalPageRoutingModule } from './event-modal-routing.module';

import { EventModalPage } from './event-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EventModalPageRoutingModule
  ],
  declarations: [EventModalPage]
})
export class EventModalPageModule {}
