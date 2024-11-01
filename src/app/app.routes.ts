import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireciona para a página de login
  { path: 'login', component: LoginComponent }, // Rota da página de login
  { path: 'dashboard', component: DashboardComponent }, // Rota da página de dashboard
];
