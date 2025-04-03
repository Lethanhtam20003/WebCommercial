import { Routes } from '@angular/router';
import {LoginComponent} from './components/login.components';
import {Label} from './constant/label';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const label: Label=new Label();

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: label.logIn,
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    title:"Dashboard",
  }
];
