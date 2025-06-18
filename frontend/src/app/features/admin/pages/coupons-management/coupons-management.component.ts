import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { GetAllCouponRequest } from '../../../../core/models/request/coupon/get-all-coupon-request.interface';
import { AdminCouponResponse } from '../../../../core/models/response/coupon/admin-coupon-response.interface';
import { Page } from '../../../../core/models/response/page-response.interface';
import { AlertService } from '../../../../core/service/alert.service';
import { CouponService } from '../../../../core/service/coupon.service';
import { UtitlyService } from '../../../../core/service/utility.service';
import { FilterField } from '../../../../shared/components/generic-filter/generic-filter-field.interface';
import { GenericFilterComponent } from '../../../../shared/components/generic-filter/generic-filter.component';
import { CouponType } from '../../../../core/enum/coupon-type.enum';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
	selector: 'app-coupons-management',
	standalone: true,
	imports: [CommonModule, GenericFilterComponent, PaginationComponent],
	templateUrl: './coupons-management.component.html',
	styleUrls: ['./coupons-management.component.scss'],
})
export class CouponsManagementComponent implements OnInit {
	coupons: AdminCouponResponse[] = [];
	isLoading = false;
	errorMsg = '';
	filterValues: Partial<GetAllCouponRequest> = {};
	currentPage = 1;
	totalPages = 1;
	pageSize = 10;
	fields: FilterField[] = [
		{
			name: 'code',
			label: 'Mã coupon',
			type: 'text',
			placeholder: 'Nhập mã...',
		},
		{
			name: 'status',
			label: 'Trạng thái',
			type: 'select',
			options: [
				{ label: 'Có thể xử dụng', value: 'ACTIVE' },
				{ label: 'Hết hạn', value: 'INACTIVE' },
				{ label: 'Đã xóa', value: 'DELETED' },
			],
		},
		{ name: 'minDiscount', label: 'Giảm giá tối thiểu (%)', type: 'number' },
		{ name: 'createdAt', label: 'Ngày tạo', type: 'date' },
		{
			name: 'minPrice',
			label: 'Giá tối thiểu',
			type: 'number',
		},
		{
			name: 'priceCondition',
			label: 'Điều kiện giá',
			type: 'number',
		},
		{
			name: 'type',
			label: 'Giảm giá theo',
			type: 'select',
			options: [
				{ label: 'Phần trăm (%)', value: 'PERCENTAGE' },
				{ label: 'Giá cố định', value: CouponType.AMOUNT as string },
			],
		},
	];

	constructor(
		private couponService: CouponService,
		protected utility: UtitlyService,
		private alert: AlertService
	) {}

	ngOnInit(): void {
		this.loadCoupons();
	}

	loadCoupons(): void {
		this.isLoading = true;
		this.errorMsg = '';

		const request: GetAllCouponRequest = {
			page: this.currentPage < 0 ? 0 : this.currentPage - 1,
			size: this.pageSize,
			...this.filterValues,
		};

		this.couponService
			.getAllCouponsForAdmin(request)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe({
				next: (response: ApiResponse<Page<AdminCouponResponse>>) => {
					this.coupons = response.result.content;
					this.totalPages = response.result.page.totalPages;
				},
				error: err => {
					this.errorMsg = 'Lỗi khi tải danh sách coupon';
					this.alert.error('Lỗi khi tải danh sách coupon');
					console.error(err);
				},
			});
	}

	onFilterChanged(values: Record<string, any>) {
		this.filterValues = values;
		this.currentPage = 1;
		this.applyFilter();
	}

	applyFilter() {
		this.loadCoupons();
	}

	onPageChange(newPage: number) {
		this.currentPage = newPage;
		this.loadCoupons();
	}
}
