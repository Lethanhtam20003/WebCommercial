import { Routes } from '@angular/router';
import { Oauth2RedirectComponent } from './shared/components/redirect/oauth2_redirect.component';
import { AuthGuard } from './core/guards/auth.guard';

import { LoginComponent } from './features/auth/login/login.component';
import { LabelConstants } from './shared/constant/label.constants';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { RouteLink } from './shared/constant/route-link';


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
		path: RouteLink.registerRoute,
		component: RegisterComponent,
		title: LabelConstants.registerPage,
	},
	{
		path: RouteLink.loginRoute,
		component: LoginComponent,
		title: LabelConstants.logInPage,
	},
  {
    path: RouteLink.oauth2RedirectRoute,
    component: Oauth2RedirectComponent,
    title: LabelConstants.ProcessingLogin,
  }
];
