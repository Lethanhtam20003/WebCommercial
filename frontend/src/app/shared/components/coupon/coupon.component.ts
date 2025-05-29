import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GetAllCouponResponse } from '../../../core/models/response/get-all-coupon-response.interface';

@Component({
	selector: 'coupon',
	standalone: true,
  imports: [CommonModule],
	templateUrl: './coupon.component.html',
})
export class CouponComponent {
	@Input() coupon!: GetAllCouponResponse;
}
