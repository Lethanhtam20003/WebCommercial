import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LabelConstants } from './shared/constants/label.constants';
import { RouteLink } from './shared/constants/route-link';

/**
 * Định nghĩa các route cho module Auth
 */
const authRoutes: Routes = [
	{
		path: RouteLink.loginRoute,
		loadComponent: () =>
			import('./features/auth/login/login.component').then(
				m => m.LoginComponent
			),
		title: LabelConstants.logInPage,
		data: {
			showHeader: false,
			showFooter: false,
		},
	},
	{
		path: RouteLink.registerRoute,
		loadComponent: () =>
			import('./features/auth/register/register.component').then(
				m => m.RegisterComponent
			),
		title: LabelConstants.registerPage,
		data: {
			showHeader: false,
			showFooter: false,
		},
	},
	{
		path: RouteLink.oauth2RedirectRoute,
		loadComponent: () =>
			import('./shared/components/redirect/oauth2_redirect.component').then(
				m => m.Oauth2RedirectComponent
			),
		title: LabelConstants.ProcessingLogin,
		data: {
			showHeader: false,
			showFooter: false,
		},
	},
];

/**
 * Định nghĩa các route được bảo vệ (yêu cầu đăng nhập)
 */
const protectedRoutes: Routes = [
	{
		path: 'home',
		loadComponent: () =>
			import('./pages/home/home.component').then(m => m.HomeComponent),
		title: 'home',
		// canActivate: [AuthGuard],
		data: {
			showHeader: true,
			showFooter: true,
		},
	},
	{
		path: RouteLink.userRoute,
		loadChildren: () =>
			import('./features/user/user-account/user-account.module').then(
				m => m.UserAccountModule
			),
		canActivate: [AuthGuard],
		data: { showHeader: true, showFooter: true },
	},
];

/**
 * Routes chính của ứng dụng
 */
export const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	...authRoutes,
	...protectedRoutes,
	{
		path: 'admin',
		loadChildren: () =>
			import('./features/admin/admin.module').then(m => m.AdminModule),
		title: 'Admin',
		// canActivate: [AuthGuard],
	},
	{
		path: '**',
		loadComponent: () =>
			import('./shared/components/error/not-found/not-found.component').then(
				m => m.NotFoundComponent
			),
		title: 'Page Not Found',
		data: {
			showHeader: false,
			showFooter: true,
		},
	},
];
