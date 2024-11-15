import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login/login.page').then((m) => m.HomePage),
  },
  {
    path: 'home',
    loadComponent: () => import('./app/home/home.page').then( m => m.HomePage)
  }
];
