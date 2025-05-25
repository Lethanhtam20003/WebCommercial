import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'coupon',
	standalone: true,
  imports: [CommonModule],
	templateUrl: './coupon.component.html',
})
export class CouponComponent {
	@Input() coupon!: Coupon;
}

export interface Coupon {
  id: number;
  code: string;
  discountPercentage: number;
  description: string;
  createdAt: string;
  expirationDate: string;
}
