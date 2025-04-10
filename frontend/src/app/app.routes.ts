import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.components';
import { LabelConstants } from './constant/label.constants';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register.components';
import { RouteLink } from './constant/route-link';

export const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		title: 'Dashboard',
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
];
