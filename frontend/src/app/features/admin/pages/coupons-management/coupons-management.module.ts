import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CouponsManagementComponent } from './coupons-management.component';
import { CouponAdminListModule } from '../../../coupon/coupon-admin-list/coupon-admin-list.module';

@NgModule({
	declarations: [CouponsManagementComponent],
	imports: [CommonModule, CouponAdminListModule],
	exports: [CouponsManagementComponent],
})
export class CouponsManagementModule {}
