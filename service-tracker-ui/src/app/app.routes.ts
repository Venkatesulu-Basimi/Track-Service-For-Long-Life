import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home/home.component';
import { AddserviceComponent } from './pages/addservice/addservice.component';
import { ViewserviceComponent } from './pages/viewservice/viewservice.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserGuard } from './auth/userauth';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'add-service',
        component: AddserviceComponent,
      },
      {
        path: 'view-service',
        component: ViewserviceComponent,
      },
      { path: 'profile', component: ProfileComponent },
      { path: '**', redirectTo: '/login' },
    ],
  },
  {
    path: 'home',
    component: DashboardComponent,
  },
];
