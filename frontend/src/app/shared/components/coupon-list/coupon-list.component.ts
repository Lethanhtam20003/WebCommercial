import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CouponComponent } from '../coupon/coupon.component';
import { CouponResponse } from '../../../core/models/response/coupon/coupon-response.interface';
import { CouponService } from '../../../core/service/coupon.service';
import { GetAllCouponRequest } from '../../../core/models/request/coupon/get-all-coupon-request.interface';
import { finalize } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Page } from '../../../core/models/response/page-response.interface';

@Component({
  selector: 'coupon-list',
  standalone: false,
  templateUrl: './coupon-list.component.html'
})
export class CouponListComponent implements OnInit{
  coupons: CouponResponse[] = [];
  isLoading = false;
  errorMsg = '';

  constructor(private couponService: CouponService) {}

  ngOnInit() {
    this.loadCoupons();
  }

  loadCoupons() {
    this.isLoading = true;
    this.errorMsg = '';

    const request: GetAllCouponRequest = { page: 0, size: 10 };

    this.couponService.getAllCoupons(request)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response: ApiResponse<Page<CouponResponse>>) => {
          this.coupons = response.result.content;
        },
        error: (err) => {
          this.errorMsg = 'Lỗi khi tải coupon';
          console.error(err);
        }
      });
  }

}
