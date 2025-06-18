import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderManagementComponent } from './pages/order-management/order-management-admin.component';
import { RouterOutlet } from '@angular/router';
import { OrderListComponent } from '../../shared/components/order-list/order-list.component';
import { OrderDetailComponent } from '../../shared/components/order-detail/order-detail.component';
import { OrderFilterComponent } from '../../shared/components/order-filter/order-filter.component';
import { CouponsManagementComponent } from './pages/coupons-management/coupons-management.component';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		AdminRoutingModule,
		AdminComponent,
		AdminSidebarComponent,
		DashboardComponent,
		RouterOutlet,
		OrderListComponent,
		OrderDetailComponent,
		OrderFilterComponent,
		CouponsManagementComponent,
    OrderManagementComponent
	],
})
export class AdminModule {}
