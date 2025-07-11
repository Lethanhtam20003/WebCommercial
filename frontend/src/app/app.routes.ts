import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LabelConstants } from './shared/constants/label.constants';
import { RouteLink } from './shared/constants/route-link';
import { AdminGuard } from './core/guards/admin.guard';
import { Title } from '@angular/platform-browser';

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
			import('./features/user/page/user-account/user-account.module').then(
				m => m.UserAccountModule
			),
		canActivate: [AuthGuard],
		data: { showHeader: true, showFooter: true },
	},
	{
		path: RouteLink.cartRoute,
		loadComponent: () =>
			import('./pages/cart/cart.component').then(m => m.CartComponent),
		canActivate: [AuthGuard],
		data: { showHeader: true, showFooter: true },
	},
	{
		path: RouteLink.checkoutRoute,
		loadComponent: () =>
			import('./features/order/checkout/checkout.component').then(m => m.CheckoutComponent),
		canActivate: [AuthGuard],
		data: { showHeader: true, showFooter: true },
	},
	{
		path: RouteLink.checkoutRoute+'/:id',
		loadComponent: () =>
			import('./features/order/checkout/checkout.component').then(m => m.CheckoutComponent),
		canActivate: [AuthGuard],
		data: { showHeader: true, showFooter: true },
	},
	{
		path: RouteLink.orderRoute,
		loadComponent: () =>
			import('./pages/order/order.component').then(m => m.OrderComponent),
		canActivate: [AuthGuard],
		data: { showHeader: true, showFooter: true },
	},
	{
		path: RouteLink.orderDetailRoute,
		loadComponent: () =>
			import('./features/order/order-detail/order-detail.component').then(
				m => m.OrderDetailComponent
			),
			canActivate: [AuthGuard],
		data: { showHeader: true, showFooter: true },
	},
	

];

/**
 * Định nghĩa các route trang lỗi
 */
const errorRouter: Routes = [
	{
		path: '403',
		loadComponent: () =>
			import('./shared/components/error/custom403/custom403.component').then(
				m => m.Custom403Component
			),
		title: '403',
		data: {
			showHeader: false,
			showFooter: true,
		},
	},
];
/**
 * 
 */
const productRoutes: Routes = [
	{
		path: 'product',
		loadComponent: () =>
			import('./pages/product/product.component').then(m => m.ProductComponent),
		data: {
			showHeader: true,
			showFooter: true,
		},
	},
];
/**
 * 
 */
const categoryRoutes: Routes = [
	{
		path: 'categories/:id',
		loadComponent: () =>
			import('./pages/category/category.component').then(
				m => m.CategoryComponent
			),
		data: {
			showHeader: true,
			showFooter: true,
		},
	},
];
/**
 * 
 */
const orderRoutes: Routes = [
	{
		path: 'checkout',
		loadComponent: () =>
			import('./features/order/checkout/checkout.component').then(
				m => m.CheckoutComponent
			),
		data: {
			showHeader: true,
			showFooter: true,
		},
	},
];
const paymentRoutes: Routes = [
	{
		path: 'payment-success',
		loadComponent: () => 
			import('./features/payment/payment-success/payment-success.component').then(
				m => m.PaymentSuccessComponent
				),
		data: {
			showHeader: true,
			showFooter: true,
		},


	},
	{
		path: 'payment-cancel',
		loadComponent: () =>
			import('./features/payment/payment-cancel/payment-cancel.component').then(
				m => m.PaymentCancelComponent
			),
		data: {
			showHeader: true,
			showFooter: true,
		},
	}
]
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
	...productRoutes,
	...categoryRoutes,
	...errorRouter,
	...paymentRoutes,

	{
		path: 'product/:id',
		loadComponent: () =>
			import('./features/product/product-detail/product-detail.component').then(
				m => m.ProductDetailComponent
			),
		title: 'chi tiết sản phẩm',
		data: {
			showHeader: true,
			showFooter: true,
		},
	},
	{
		path: 'admin',
		loadChildren: () =>
			import('./features/admin/admin.module').then(m => m.AdminModule),
		title: 'Admin',
		canActivate: [AdminGuard],
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
