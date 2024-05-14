import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'padel',
    loadChildren: () => import('./padel/padel.module').then( m => m.PadelPageModule)
  },
  {
    path: '',
    redirectTo: 'padel',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    loadChildren: () => import('./auth/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'field',
    loadChildren: () => import('./field/field.module').then( m => m.FieldPageModule)
  },
  {
    path: 'field',
    loadChildren: () => import('./reservation/field/field.module').then( m => m.FieldPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
