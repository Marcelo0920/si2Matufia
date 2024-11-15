import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'clients', pathMatch: 'full' },
      {
        path: 'clients',
        loadComponent: () =>
          import('./components/client-list/client-list.component').then(
            (m) => m.ClientListComponent
          ),
      },
      {
        path: 'formulario-sesion',
        loadComponent: () =>
          import(
            './components/formulario-sesion/formulario-sesion.component'
          ).then((m) => m.FormularioSesionComponent),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('./components/student-list/student-list.component').then(
            (m) => m.StudentListComponent
          ),
      },
    ],
  },
];
