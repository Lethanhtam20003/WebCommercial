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
import { CouponCreateRequest } from '../../../../core/models/request/coupon/coupon-create-request.interface';
import { CouponStatus } from '../../../../core/enum/coupon-status.enum';

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
	showFilter = false;
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
				{ label: 'Phần trăm (%)', value: CouponType.PERCENTAGE as string },
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

	toggleFilter() {
		this.showFilter = !this.showFilter;
	}

	async openCreateCoupon() {
		const data = await this.alert.showForm('Thêm mã giảm giá', [
			{ label: 'Mã coupon', name: 'code', required: true },
			{
				label: 'Phần trăm giảm (%)',
				name: 'discount',
				type: 'number',
				required: true,
			},
			{ label: 'Mô tả', name: 'description', type: 'textarea', required: true },
			{
				label: 'Số lượt sử dụng tối đa',
				name: 'limitUsers',
				type: 'number',
				required: true,
			},
			{
				label: 'Ngày hết hạn (YYYY-MM-DDTHH:mm)',
				name: 'expirationDate',
				type: 'datetime-local',
				required: true,
			},
			{
				label: 'Loại (Phần trăm (%), Giá cố định)',
				name: 'type',
				type: 'select',
				required: true,
				options: [
					{ label: 'Phần trăm (%)', value: CouponType.PERCENTAGE as string },
					{ label: 'Giá cố định', value: CouponType.AMOUNT as string },
				],
			},
			{
				label: 'Giá điều kiện (nếu có)',
				name: 'priceCondition',
				type: 'number',
				required: true,
			},
			{
				label: 'Giá tối thiểu',
				name: 'minPrice',
				type: 'number',
				required: true,
			},
		]);

		if (!data) return;

		try {
			let rawDiscount = parseFloat(data['discount'] as string);
			const discount = rawDiscount >= 1 ? rawDiscount / 100 : rawDiscount;

			const request: CouponCreateRequest = {
				code: data['code'] as string,
				discount,
				description: data['description'] as string,
				limitUsers: parseInt(data['limitUsers'] as string),
				createdAt: new Date().toISOString().split('.')[0],
				expirationDate: new Date(
					data['expirationDate'] as string
				).toISOString().split('.')[0],
				status: CouponStatus.ACTIVE,
				type: data['type'] as CouponType,
				priceCondition: parseFloat(data['priceCondition'] as string),
				minPrice: parseFloat(data['minPrice'] as string),
			};

			console.log(`Request: ${JSON.stringify(request)}`);

			this.couponService.createCoupon(request).subscribe({
				next: res => {
          this.alert.success('Tạo má giảm giá thành công');
					console.log('✅ Tạo mã giảm giá thành công:', res.result);
					this.loadCoupons(); // hàm reload lại danh sách coupon
				},
				error: err => {
					console.error('❌ Lỗi khi tạo mã giảm giá:', err);
					this.alert.error('Tạo mã giảm giá thất bại');
				},
			});
		} catch (err) {
			this.alert.error('Dữ liệu không hợp lệ, vui lòng kiểm tra lại');
		}
	}
}
