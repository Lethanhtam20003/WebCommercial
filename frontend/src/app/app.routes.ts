import { Routes } from '@angular/router';
import {LoginComponent} from './components/login.components';
import {Label} from './constant/label';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/register.components';

export const routes: Routes = [
  {
    path: 'log-in',
    component: LoginComponent,
    title: Label.logInPage,
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: Label.registerPage,
  },
  {
    path:'',
    component:DashboardComponent,
    title:"Dashboard",
  }
];
