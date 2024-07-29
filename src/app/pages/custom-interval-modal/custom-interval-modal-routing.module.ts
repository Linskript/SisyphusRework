import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomIntervalModalPage } from './custom-interval-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CustomIntervalModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomIntervalModalPageRoutingModule {}
