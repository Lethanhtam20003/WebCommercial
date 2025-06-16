import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderStatus } from '../../../core/enum/order-status.enum';
import { UtitlyService } from './../../../core/service/utility.service';
import { GetAllOrdersAdminRequest } from '../../../core/models/request/order/get-all-orders-admin-request.interface';

/**
 * Component filter đơn hàng cho admin, gồm các trường:
 * - Trạng thái (status) - dạng select, hiển thị tiếng Việt, gửi code backend khi lọc.
 * - Người đặt (username) - dạng text.
 * - Khoảng ngày đặt (createdDateFrom, createdDateTo) - dạng date.
 * - Tổng tiền tối thiểu (totalPrice) - dạng number.
 *
 * Sử dụng UtiliService để chuyển đổi trạng thái giữa tiếng Việt và backend code.
 * Kết quả filter trả về qua sự kiện @Output filterChanged.
 */
@Component({
	selector: 'order-filter',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './order-filter.component.html',
	styleUrl: './order-filter.component.scss',
})
export class OrderFilterComponent implements OnInit {
	protected isFilterButtonPressed: boolean = false;
	protected isRemoveButtonPressed: boolean = false;
	/**
	 * Sự kiện phát ra khi người dùng nhấn nút "Lọc" hoặc "Xóa".
	 * Trả về object chứa các trường filter phù hợp với GetAllOrderAdminRequest.
	 */
	@Output() filterChanged = new EventEmitter<
		Partial<GetAllOrdersAdminRequest>
	>();

	/** Trạng thái đơn hàng (giá trị là code backend, ví dụ: PENDING, SHIPPED, ...) */
	status: OrderStatus | '' = '';

	/** Lấy các giá trị của enum */
	orderStatusList = Object.values(OrderStatus);

	/** FormGroup lọc đơn hàng */
	filterForm: FormGroup = new FormGroup({});

	/** Tên người đặt đơn */
	username: string = '';

	/** Ngày bắt đầu lọc */
	createdDateFrom: string = '';

	/** Ngày kết thúc lọc */
	createdDateTo: string = '';

	/** Tổng tiền tối thiểu */
	totalPrice: number | null = null;

	/**
	 * Inject UtiliService để map trạng thái tiếng Việt <-> backend code.
	 * @param utiliService Service tiện ích
	 */
	constructor(
		protected utitlyService: UtitlyService,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.filterForm = this.fb.group({
			status: [''],
			username: [''],
			createdDateFrom: [''],
			createdDateTo: [''],
			totalPrice: [''],
		});
	}

	/**
	 * Phát sự kiện filterChanged với dữ liệu filter hiện tại,
	 * map status sang code backend sử dụng utiliService.
	 */
	applyFilter() {
		const raw = this.filterForm.value;

		const parseVnd = (val: string): number | undefined => {
			if (!val) return undefined;

			// Xóa ký tự không phải số
			const cleaned = val.replace(/[^\d]/g, '');

			const parsed = parseInt(cleaned, 10);
			return isNaN(parsed) ? undefined : parsed;
		};

		const backendStatus = this.utitlyService.mapStatusToBackend(
			raw.status
		) as OrderStatus;

		const request: GetAllOrdersAdminRequest = {
			status: backendStatus || undefined,
			username: raw.username || undefined,
			createdDateFrom: raw.createdDateFrom || undefined,
			createdDateTo: raw.createdDateTo || undefined,
			totalPrice: parseVnd(raw.totalPrice),
		};

		this.filterChanged.emit(request);
	}

	/**
	 * Reset toàn bộ filter về mặc định và phát sự kiện filterChanged.
	 */
	clearFilter() {
		this.filterForm.reset({
			status: '',
			username: '',
			createdDateFrom: '',
			createdDateTo: '',
			totalPrice: '',
		});
		this.applyFilter();
	}

	onPress(button: 'filter' | 'remove'): void {
		if (button === 'filter') {
			this.isFilterButtonPressed = true;
		} else if (button === 'remove') {
			this.isRemoveButtonPressed = true;
		}
	}

	onRelease(button: 'filter' | 'remove'): void {
		if (button === 'filter') {
			this.isFilterButtonPressed = false;
		} else if (button === 'remove') {
			this.isRemoveButtonPressed = false;
		}
	}
}
