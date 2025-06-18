import { Component, OnInit } from '@angular/core';
import { PromotionAdminResponse } from '../../../../core/models/response/promotions/promotion-admin-response.interface';
import { PromotionService } from '../../../../core/service/promotion.service';
import { catchError, of } from 'rxjs';
import { Page } from '../../../../core/models/response/page-response.interface';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { PromotionResponse } from '../../../../core/models/response/promotions/promotion-response.interface';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { GenericFilterComponent } from '../../../../shared/components/generic-filter/generic-filter.component';
import { GetAllPromotionAdminRequest } from '../../../../core/models/request/promotion/get-all-promotion-admin-request.interface';
import { FilterField } from '../../../../shared/components/generic-filter/generic-filter-field.interface';

@Component({
	selector: 'app-promotion-management',
	standalone: true,
	imports: [CommonModule, PaginationComponent, GenericFilterComponent],
	templateUrl: './promotion-management.component.html',
	styleUrls: ['./promotion-management.component.css'],
})
export class PromotionManagementComponent implements OnInit {
	promotions: PromotionAdminResponse[] = [];
	protected currentPage: number = 1;
	private pageSize: number = 10;
	protected totalPages: number = 1;
	protected formValues: Partial<GetAllPromotionAdminRequest> = {};
	private countdownInterval!: ReturnType<typeof setInterval>;
	promotionFilterFields: FilterField[] = [
		{
			label: 'Tên khuyến mãi',
			name: 'name',
			type: 'text',
			placeholder: 'Nhập tên',
		},
		{
			label: 'Từ ngày',
			name: 'startDateFrom',
			type: 'date',
		},
		{
			label: 'Đến ngày',
			name: 'endDateTo',
			type: 'date',
		},
		{
			label: 'Tối thiểu (%)',
			name: 'minDiscount',
			type: 'number',
			placeholder: '%',
		},
	];
	constructor(private promotionService: PromotionService) {}
	ngOnInit(): void {
		this.loadPromotions();
		this.startCountdownTimer();
	}

	loadPromotions(): void {
		const sanitizedFormValues = Object.fromEntries(
			Object.entries(this.formValues).map(([key, value]) => [
				key,
				typeof value === 'string' ? value.trim() : value,
			])
		);

		this.promotionService
			.getAllPromotionsFilter({
				page: this.currentPage < 0 ? 0 : this.currentPage - 1,
				size: this.pageSize,
				...sanitizedFormValues,
			})
			.pipe(
				catchError(err => {
					console.error('❌ Lỗi khi lấy danh sách khuyến mãi:', err);
					return of({
						result: {
							content: [],
							page: {
								totalPages: 0,
								totalElements: 0,
								size: 0,
								number: 0,
							},
						},
					} as ApiResponse<Page<PromotionResponse>>);
				})
			)
			.subscribe((data: ApiResponse<Page<PromotionResponse>>) => {
				const pageData = data.result;
				console.log('Phân trang: ', pageData);

				this.totalPages = pageData.page.totalPages || 1;
				console.log(this.totalPages);

				this.promotions = data.result.content.map(coupon => {
					const endTimestamp = new Date(coupon.endDate).getTime();
					const remainingTime = this.getRemainingTime(endTimestamp);
					const expired = endTimestamp <= Date.now();

					return {
						...coupon,
						expired,
						remainingTime,
						saved: false,
					};
				});
			});
	}

	getRemainingTime(expireAt: number): string {
		const msLeft = expireAt - Date.now();
		if (msLeft <= 0) return 'Đã hết hạn';

		const mins = Math.floor(msLeft / (60 * 1000));
		const secs = Math.floor((msLeft % (60 * 1000)) / 1000);
		return `Còn ${mins} phút ${secs < 10 ? '0' + secs : secs} giây`;
	}

	onPageChange(page: number) {
		this.currentPage = page;
		this.loadPromotions();
	}

	onFilterChanged(filterValues: Partial<GetAllPromotionAdminRequest>) {
		this.formValues = filterValues;
		this.currentPage = 1;
		this.loadPromotions();
	}

	startCountdownTimer() {
		this.countdownInterval = setInterval(() => {
			this.promotions = this.promotions.map(promotion => {
				const endTimestamp = new Date(promotion.endDate).getTime();
				const remainingTime = this.getRemainingTime(endTimestamp);
				const expired = endTimestamp <= Date.now();

				return {
					...promotion,
					remainingTime,
					expired,
				};
			});
		}, 1000); // mỗi 1 giây
	}

	ngOnDestroy(): void {
		clearInterval(this.countdownInterval);
	}
}
