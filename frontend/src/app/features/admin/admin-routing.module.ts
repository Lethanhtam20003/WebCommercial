import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { AdminProductListComponent } from './components/product-manament/admin-product-list/admin-product-list.component';
import { InventoryManagementComponent } from './pages/inventory-management/inventory-management.component';

const productManagementRoutes: Routes = [
	{
		path: 'product-management',
		component: ProductManagementComponent,
		children: [
			{
				path: 'product-list',
				loadComponent: () =>
					import(
						'./components/product-manament/admin-product-list/admin-product-list.component'
					).then(m => m.AdminProductListComponent),
				data: {
					showHeader: false,
					showFooter: false,
				},
			},
			{
				path: 'create-product',
				loadComponent: () =>
					import(
						'./components/product-manament/admin-product-create/admin-product-create.component'
					).then(m => m.AdminProductCreateComponent),
				data: {
					showHeader: false,
					showFooter: false,
				},
			},
			{
				path: '',
				redirectTo: 'product-list',
				pathMatch: 'full',
			},
		],
	},
];

const inventoryManagementRoutes: Routes = [
	{
		path: 'inventory-management',
		component: InventoryManagementComponent,
		children: [
			{
				path: 'inventory-list',
				loadComponent: () =>
					import(
						'./components/inventory-management/list-import-order/list-import-order.component'
					).then(m => m.ListImportOrderComponent),
			},
			{
				path: 'create-inventory',
				loadComponent: () =>
					import(
						'./components/inventory-management/Import-inventory/Import-inventory.component'
					).then(m => m.ImportInventoryComponent),
			},
			{
				path: '',
				redirectTo: 'inventory-list',
				pathMatch: 'full',
			},
		],
		data: {
			showHeader: false,
			showFooter: false,
		},
	},
];
const categoryManagementRoutes: Routes = [
	{
		path: 'category-management',
		loadComponent: () =>
			import('./pages/category-management/category-management.component').then(
				m => m.CategoryManagementComponent
			),
		data: {
			showHeader: false,
			showFooter: false,
		},
	},
];
const reviewManagementRoutes: Routes = [
	{
		path: 'review-management',
		loadComponent: () =>
			import('./pages/review-management/review-management.component').then(
				m => m.ReviewManagementComponent
			),
		data: {
			showHeader: false,
			showFooter: false,
		},
	},
];
const couponsManagementRoutes: Routes = [
	{
		path: 'coupons-management',
		loadComponent: () =>
			import('./pages/coupons-management/coupons-management.component').then(
				m => m.CouponsManagementComponent
			),
		data: {
			showHeader: false,
			showFooter: false,
		},
	},
];
/**
 * Định nghĩa các route cho module admin
 **/
const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: 'dashboard',
				component: DashboardComponent,
				data: {
					showHeader: false,
					showFooter: false,
				},
			},
			...productManagementRoutes,
			...inventoryManagementRoutes,
			{
				path: 'order-management',
				loadComponent: () =>
					import('./pages/order-management/order-management-admin.component').then(
						m => m.OrderManagementComponent
					),
				children: [
					{
						path: 'order-list',
						loadComponent: () =>
							import(
								'../order/order-list-tab/order-list-tab.component'
							).then(m => m.OrderListTabComponent),
						data: {
							showHeader: false,
							showFooter: false,
						},
					},
					// {
					// 	path: 'payment-list',
					// 	loadComponent: () =>
					// 		import('../payment-list/payment-list.component').then(
					// 			m => m.PaymentListComponent
					// 		),
					// 	data: {
					// 		showHeader: false,
					// 		showFooter: false,
					// 	},
					// },
					{
						path: 'refund-list',
						loadComponent: () =>
							import('../refund-list/refund-list.component').then(
								m => m.RefundListComponent
							),
						data: {
							showHeader: false,
							showFooter: false,
						},
					},
					{
						path: '',
						redirectTo: 'order-list',
						pathMatch: 'full',
						data: {
							showHeader: false,
							showFooter: false,
						},
					},
				],
				data: {
					showHeader: false,
					showFooter: false,
				},
			},
			{
				path: 'customer-management',
				loadComponent: () =>
					import(
						'./pages/customer-management/customer-management.component'
					).then(m => m.CustomerManagementComponent),
				data: {
					showHeader: false,
					showFooter: false,
				},
			},
			...categoryManagementRoutes,
			...reviewManagementRoutes,
			...couponsManagementRoutes,
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
				data: {
					showHeader: false,
					showFooter: false,
				},
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
