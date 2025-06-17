import { Component, OnInit } from '@angular/core';
import { AdminCouponResponse } from '../../../core/models/response/coupon/admin-coupon-response.interface';
import { CouponService } from '../../../core/service/coupon.service';
import { GetAllCouponRequest } from '../../../core/models/request/coupon/get-all-coupon-request.interface';
import { finalize } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Page } from '../../../core/models/response/page-response.interface';
import { UtitlyService } from '../../../core/service/utility.service';

@Component({
	selector: 'app-coupon-admin-list',
	standalone: false,
	templateUrl: './coupon-admin-list.component.html',
	styleUrl: './coupon-admin-list.component.scss',
})
export class CouponAdminListComponent implements OnInit {
	coupons: AdminCouponResponse[] = [];
	isLoading = false;
	errorMsg = '';

	constructor(private couponService: CouponService, protected utility: UtitlyService) {}
  ngOnInit(): void {
    this.loadCoupons();
  }

	loadCoupons(): void {
		this.isLoading = true;
		this.errorMsg = '';

		const request: GetAllCouponRequest = {
			page: 0,
			size: 10,
		};

		this.couponService
			.getAllCouponsForAdmin(request)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe({
				next: (response: ApiResponse<Page<AdminCouponResponse>>) => {
					this.coupons = response.result.content;
				},
				error: err => {
					this.errorMsg = 'Lỗi khi tải danh sách coupon';
					console.error(err);
				},
			});
	}
}
