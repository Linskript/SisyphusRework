import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'painel',
    loadChildren: () => import('./pages/painel/painel.module').then( m => m.PainelPageModule)
  },
  {
    path: 'event-modal',
    loadChildren: () => import('./pages/event-modal/event-modal.module').then( m => m.EventModalPageModule)
  },
  {
    path: 'delete-event-modal',
    loadChildren: () => import('./pages/delete-event-modal/delete-event-modal.module').then( m => m.DeleteEventModalPageModule)
  },
  {
    path: 'custom-interval-modal',
    loadChildren: () => import('./pages/custom-interval-modal/custom-interval-modal.module').then( m => m.CustomIntervalModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
