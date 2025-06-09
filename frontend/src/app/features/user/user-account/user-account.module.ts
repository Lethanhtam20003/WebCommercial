import { CommonModule, NgClass, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { userAccountRoutes } from './user-account-routing.module';
import { ChangePasswordComponent } from '../../../shared/components/change-password/change-password.component';
import { UserProfileComponent } from '../../../shared/components/user-profile/user-profile.component';
import { UserAccountComponent } from '../../../shared/components/user-account/user-account.component';
import { SideBarUserAccount } from '../../../shared/components/side-bar-user-account/side-bar-user-account';
import { CouponListComponent } from '../../../shared/components/coupon-list/coupon-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CouponComponent } from '../../../shared/components/coupon/coupon.component';
import { OrderManangementComponent } from '../../../shared/components/order-management/order-management.component';
import { OrderListComponent } from '../../../shared/components/order-list/order-list.component';
import { OrderDetailComponent } from '../../../shared/components/order-detail/order-detail.component';

@NgModule({
	declarations: [
		SideBarUserAccount,
		UserProfileComponent,
		ChangePasswordComponent,
		OrderManangementComponent,
		CouponListComponent,
		UserAccountComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(userAccountRoutes),
		RouterLink,
		NgClass,
		ReactiveFormsModule,
		NgIf,
		RouterOutlet,
		CouponComponent,
		OrderListComponent,
		OrderDetailComponent,
	],
})
export class UserAccountModule {}
