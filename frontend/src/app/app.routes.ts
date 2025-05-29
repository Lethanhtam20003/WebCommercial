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
				title: LabelConstants.userProfile,
				// canActivate: [AuthGuard],
				data: {
					showHeader: true,
					showFooter: true,
					breadcrumb: LabelConstants.userAccount,
				},
			},
			{
				path: RouteLink.changePasswordRoute,
				loadComponent: () =>
					import(
						'./shared/components/change-password/change-password.component'
					).then(m => m.ChangePasswordComponent),
				title: LabelConstants.changePassword,
				// canActivate: [AuthGuard],
				data: {
					showHeader: true,
					showFooter: true,
					breadcrumb: LabelConstants.userAccount,
				},
			},
			{
				path: RouteLink.orderRoute + '/:status',
				loadComponent: () =>
					import(
						'./shared/components/order-management/order-management.component'
					).then(m => m.OrderMamangementComponent),
				title: LabelConstants.order,
				// canActivate: [AuthGuard],
				data: {
					showHeader: true,
					showFooter: true,
					breadcrumb: LabelConstants.userAccount,
				},
			},
      {
				path: RouteLink.couponRoute,
				loadComponent: () =>
					import(
						'./shared/components/coupon-list/coupon-list.component'
					).then(m => m.CouponListComponent),
				title: LabelConstants.couponList,
				// canActivate: [AuthGuard],
				data: {
					showHeader: true,
					showFooter: true,
					breadcrumb: LabelConstants.userAccount,
				},
			},
			{
				path: '',
				redirectTo: RouteLink.profileRoute,
				pathMatch: 'full',
				data: {
					showHeader: true,
					showFooter: true,
					breadcrumb: LabelConstants.userProfile,
				},
			},
			{
				path: RouteLink.orderRoute,
				redirectTo: `${RouteLink.orderRoute}/${RouteLink.allRoute}`,
				pathMatch: 'full',
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
