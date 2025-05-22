import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Label } from './core/constants/label.constants';
import { RouteLink } from './core/constants/route-link';

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
		title: Label.logInPage,
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
		title: Label.registerPage,
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
		title: Label.ProcessingLogin,
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
		path: 'dashboard',
		loadComponent: () =>
			import('./shared/components/dashboard/dashboard.component').then(
				m => m.DashboardComponent
			),
		title: 'Dashboard',
		// canActivate: [AuthGuard],
		data: {
			showHeader: true,
			showFooter: true,
			breadcrumb: 'Dashboard',
		},
	},
	{
		path: RouteLink.userRoute,
		loadComponent: () =>
			import('./shared/components/user-account/user-account.component').then(
				m => m.UserAccountComponent
			),
		children: [
			{
				path: RouteLink.profileRoute,
				loadComponent: () =>
					import(
						'./shared/components/user-profile/user-profile.component'
					).then(m => m.UserProfileComponent),
				title: Label.userProfile,
				// canActivate: [AuthGuard],
				data: {
					showHeader: true,
					showFooter: true,
					breadcrumb: Label.userProfile,
				},
			},
			{
				path: RouteLink.changePasswordRoute,
				loadComponent: () =>
					import(
						'./shared/components/change-password/change-password.component'
					).then(m => m.ChangePasswordComponent),
				title: Label.changePassowrd,
				// canActivate: [AuthGuard],
				data: {
					showHeader: true,
					showFooter: true,
					breadcrumb: Label.userProfile,
				},
			},
			{
				path: RouteLink.orderRoute,
				loadComponent: () =>
					import(
						'./shared/components/order-mamangement/order-mamangement.component'
					).then(m => m.OrderMamangementComponent),
				title: Label.order,
				// canActivate: [AuthGuard],
				data: {
					showHeader: true,
					showFooter: true,
					breadcrumb: Label.userProfile,
				},
			},
			{
				path: '',
				redirectTo: RouteLink.profileRoute,
				pathMatch: 'full',
				data: {
					showHeader: true,
					showFooter: true,
					breadcrumb: Label.userProfile,
				},
			},
		],
	},
];

/**
 * Routes chính của ứng dụng
 */
export const routes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full',
	},
	...authRoutes,
	...protectedRoutes,
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
