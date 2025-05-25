import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Coupon, CouponComponent } from '../coupon/coupon.component';

@Component({
  selector: 'coupon-list',
  standalone: true,
  imports: [CommonModule, CouponComponent],
  templateUrl: './coupon-list.component.html'
})
export class CouponListComponent {
  coupons: Coupon[] = [
    {
      id: 1,
      code: 'SHOPEE12',
      discountPercentage: 12,
      description: 'Giảm 12% tối đa ₫70k cho đơn từ ₫250k',
      createdAt: new Date().toISOString(),
      expirationDate: new Date(new Date().getTime() + 4 * 3600 * 1000).toISOString() // sau 4 tiếng
    },
    {
      id: 2,
      code: 'FREESHIP50',
      discountPercentage: 0,
      description: 'Freeship tối đa ₫50k cho đơn từ ₫45k',
      createdAt: new Date().toISOString(),
      expirationDate: new Date(new Date().getTime() + 1 * 3600 * 1000).toISOString()
    },
    {
      id: 3,
      code: 'ELEC11',
      discountPercentage: 11,
      description: 'Giảm 11% tối đa ₫50k cho đơn từ ₫99k',
      createdAt: new Date().toISOString(),
      expirationDate: new Date(new Date().getTime() + 0.5 * 3600 * 1000).toISOString()
    },
    {
      id: 4,
      code: 'SHOPEE15',
      discountPercentage: 15,
      description: 'Giảm 15% tối đa ₫150k cho đơn từ ₫300k',
      createdAt: new Date().toISOString(),
      expirationDate: new Date(new Date().getTime() + 2 * 3600 * 1000).toISOString()
    }
  ];
}
