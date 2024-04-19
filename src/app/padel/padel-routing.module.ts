import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PadelPage } from './padel.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: PadelPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'reservation',
        loadChildren: () => import('./reservation/reservation.module').then( m => m.ReservationPageModule)
      },
      {
        path: '',
        redirectTo: '/padel/tabs/home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/padel/tabs/home',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PadelPageRoutingModule {}
