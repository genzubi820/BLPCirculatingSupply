import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {noAuthGuard} from "./guards/no-auth.guard";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((c) => c.LoginComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: 'info',
    loadComponent: () => import('./components/info/info.component').then((c) => c.InfoComponent)
  },
  {
    path: 'update',
    loadComponent: () => import('./components/update/update.component').then((c) => c.UpdateComponent),
    canActivate: [authGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then((c) => c.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
