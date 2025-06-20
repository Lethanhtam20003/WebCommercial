import { Component, OnInit } from '@angular/core';
import { PromotionAdminResponse } from '../../../../core/models/response/promotions/promotion-admin-response.interface';
import { PromotionService } from '../../../../core/service/promotion.service';
import { catchError, firstValueFrom, of } from 'rxjs';
import { Page } from '../../../../core/models/response/page-response.interface';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { PromotionResponse } from '../../../../core/models/response/promotions/promotion-response.interface';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { GenericFilterComponent } from '../../../../shared/components/generic-filter/generic-filter.component';
import { GetAllPromotionAdminRequest } from '../../../../core/models/request/promotion/get-all-promotion-admin-request.interface';
import { FilterField } from '../../../../shared/components/generic-filter/generic-filter-field.interface';
import { AlertService } from '../../../../core/service/alert.service';
import { CreatePromotionRequest } from '../../../../core/models/response/promotions/create-promotion-request.interface';
import { CloudinaryUploadService } from '../../service/cloudinary-upload.service';
import { ProductService } from '../../../../core/service/product.service';
import { AdminProductService } from '../../service/admin-product.service';

@Component({
	selector: 'app-promotion-management',
	standalone: true,
	providers: [CloudinaryUploadService],
	imports: [CommonModule, PaginationComponent, GenericFilterComponent],
	templateUrl: './promotion-management.component.html',
	styleUrls: ['./promotion-management.component.css'],
})
export class PromotionManagementComponent implements OnInit {
	promotions: PromotionAdminResponse[] = [];
	protected currentPage: number = 1;
	private pageSize: number = 10;
	protected totalPages: number = 1;
	protected showFilter: boolean = false;
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
	constructor(
		private promotionService: PromotionService,
		private alert: AlertService,
		private cloudinary: CloudinaryUploadService,
		private adminProductService: AdminProductService
	) {}
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

	// private async getProductOptions() {
	// 	try {
	// 		const res = await firstValueFrom(
	// 			this.adminProductService.getAll({ page: 0, size: 300 })
	// 		);
	// 		return res.content.map(p => ({
	// 			label: p.name,
	// 			value: p.id.toString(),
	// 		}));
	// 	} catch (err) {
	// 		this.alert.error('Lỗi khi tải danh sách sản phẩm');
	// 		return [];
	// 	}
	// }

	async openCreatePromotion() {
		const data = await this.alert.showForm('Thêm khuyến mãi', [
			{ label: 'Tên khuyến mãi', name: 'name', required: true },
			{
				label: 'Phần trăm giảm (%)',
				name: 'discountPercent',
				type: 'number',
				required: true,
			},
			{
				label: 'Từ ngày',
				name: 'startDate',
				type: 'datetime-local',
				value: new Date().toISOString().slice(0, 16), // chuẩn input datetime-local
				required: false,
			},
			{
				label: 'Ngày kết thúc (YYYY-MM-DDTHH:mm)',
				name: 'endDate',
				type: 'datetime-local',
				required: true,
			},
			{
				label: 'Mô tả',
				name: 'description',
				type: 'textarea',
				required: true,
			},
			{
				label: 'Ảnh mã giảm giá',
				name: 'imageUrl',
				type: 'file',
				required: true,
			},
			// {
			// 	label: 'Sản phẩm áp dụng',
			// 	name: 'productIds',
			// 	type: 'multiselect',
			// 	required: true,
			// 	options: await this.getProductOptions(),
			// },
		]);

		if (!data) return;

		// 👇 Bắt đầu upload ảnh nếu là File
		let imageUrl: string | undefined;
		const imageFile = data['imageUrl'];

		if (imageFile instanceof File) {
			try {
				imageUrl = await this.cloudinary.uploadImage(imageFile);
				console.log(imageUrl);
			} catch (err) {
				this.alert.error('Lỗi khi upload ảnh');
				return;
			}
		} else {
			this.alert.error('Ảnh không hợp lệ');
			return;
		}

		if (!imageUrl) {
			this.alert.error('Ảnh upload không thành công');
			return;
		}

		try {
			const discountPercent = parseFloat(data['discountPercent'] as string);

			const request: CreatePromotionRequest = {
				name: data['name'] as string,
				discountPercent,
				startDate: new Date(data['startDate'] as string)
					.toISOString()
					.split('.')[0],
				endDate: new Date(data['endDate'] as string)
					.toISOString()
					.split('.')[0],
				description: data['description'] as string,
				image: imageUrl,
			};

			console.log(`Request: ${JSON.stringify(request)}`);

			this.promotionService.createPromotion(request).subscribe({
				next: res => {
					this.alert.success('Tạo khuyến mãi thành công');
					console.log('✅ Tạo khuyến mãi thành công:', res.result);
					this.loadPromotions(); // giả sử bạn có hàm này để reload danh sách
				},
				error: err => {
					console.error('❌ Lỗi khi tạo khuyến mãi:', err);
					this.alert.error('Tạo khuyến mãi thất bại');
				},
			});
		} catch (err) {
			this.alert.error('Dữ liệu không hợp lệ, vui lòng kiểm tra lại');
		}
	}

	toggleFilter() {
		this.showFilter = !this.showFilter;
	}

	deletePromotion(promotionId: number) {
		this.alert
			.confirm('Bạn có chắc muốn xoá khuyến mãi này?')
			.then(confirmed => {
				if (!confirmed) return;

				this.promotionService.deletePromotion(promotionId).subscribe({
					next: () => {
						this.alert.success('Đã xoá khuyến mãi');
						this.loadPromotions();
					},
					error: err => {
						console.error('❌ Lỗi khi xoá khuyến mãi:', err);
						this.alert.error('Không thể xoá khuyến mãi');
					},
				});
			});
	}
}
