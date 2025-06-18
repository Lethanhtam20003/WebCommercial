import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { InventoryManagementComponent } from './pages/inventory-management/inventory-management.component';
import { OrderManagementComponent } from './pages/order-management/order-management-admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CouponsManagementComponent } from './pages/coupons-management/coupons-management.component';

const routeData = {
	showHeader: false,
	showFooter: false,
};
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
				data: routeData,
			},
			{
				path: 'create-product',
				loadComponent: () =>
					import(
						'./components/product-manament/admin-product-create/admin-product-create.component'
					).then(m => m.AdminProductCreateComponent),
				data: routeData,
			},
			{
				path: 'edit-product/:id',
				loadComponent: () =>
					import(
						'./components/product-manament/admin-fix-product/admin-fix-product.component'
					).then(m => m.AdminFixProductComponent),
				data: routeData,
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
				data: routeData,
			},
			{
				path: 'create',
				loadComponent: () =>
					import(
						'./components/inventory-management/Import-inventory/Import-inventory.component'
					).then(m => m.ImportInventoryComponent),
				data: routeData,
			},
			{
				path: 'view/:id',
				loadComponent: () =>
					import(
						'./components/inventory-management/purchase-order-detail/purchase-order-detail.component'
					).then(m => m.PurchaseOrderDetailComponent),
				data: routeData,
			},
			{
				path: 'inventory',
				loadComponent: () =>
					import(
						'./components/inventory-management/inventory-list/inventory-list.component'
					).then(m => m.InventoryListComponent),
				data: routeData,

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
const orderManagementRoutes: Routes = [
	{
		path: 'order-management',
		loadComponent: () =>
			import('./pages/order-management/order-management-admin.component').then(
				m => m.OrderManagementComponent
			),
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
		data: routeData,
	},
];
const couponsManagementRoutes: Routes = [
	{
		path: 'coupons-management',
		component: CouponsManagementComponent,
		data: {
			showHeader: false,
			showFooter: false,
		},
	},
];
const promotionsManagementRoutes: Routes = [
	{
		path: 'promotions-management',
		loadComponent: () =>
			import(
				'./pages/promotion-management/promotion-management.component'
			).then(m => m.PromotionManagementComponent),
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
				data: routeData,
			},
			...productManagementRoutes,
			...inventoryManagementRoutes,
			...orderManagementRoutes,
			{
				path: 'customer-management',
				loadComponent: () =>
					import(
						'./pages/customer-management/customer-management.component'
					).then(m => m.CustomerManagementComponent),
				data: routeData,
			},
			...categoryManagementRoutes,
			...reviewManagementRoutes,
			...couponsManagementRoutes,
			...promotionsManagementRoutes,
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
				data: routeData,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
