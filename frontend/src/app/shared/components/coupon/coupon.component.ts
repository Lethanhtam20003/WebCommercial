import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CouponResponse } from '../../../core/models/response/coupon/coupon-response.interface';

@Component({
	selector: 'coupon',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './coupon.component.html',
})
export class CouponComponent {
	@Input() coupon!: CouponResponse;
}
