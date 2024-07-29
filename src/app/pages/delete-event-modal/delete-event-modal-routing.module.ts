import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteEventModalPage } from './delete-event-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteEventModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteEventModalPageRoutingModule {}
