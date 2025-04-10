import { Routes } from '@angular/router';
import {LoginComponent} from './components/login.components';
import {Label} from './constant/label';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { Oauth2RedirectComponent } from './components/oauth2_redirect.component';
import { AuthGuard } from './core/auth.guard';
const label: Label=new Label();

export const routes: Routes = [
  {
    path: '',
    redirectTo : 'dashboard',
    pathMatch: 'full',
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [AuthGuard],
    title:"Dashboard",
  },
  {
    path: 'oauth2-redirect',
    component: Oauth2RedirectComponent,
    title: 'Đang xử lý đăng nhập...',
  }
];
