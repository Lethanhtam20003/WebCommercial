import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../core/models/api-response.model';
import { OrderResponse } from '../../../core/models/response/order/order-response.interface';
import { Page } from '../../../core/models/response/page-response.interface';
import { OrderService } from '../../../core/service/order.service';
import { OrderDetailComponent } from '../order-detail-admin/order-detail-admin.component';
import { OrderListComponent } from '../order-list/order-list.component';
import { OrderFilterComponent } from '../../../shared/components/order-filter/order-filter.component';
import { OrderFilterRequest } from '../../../core/models/request/order/order-filter-request.interface';

/**
 * Component hiển thị tab danh sách đơn hàng cho admin.
 * - Bao gồm bộ lọc đơn hàng, danh sách đơn hàng và chi tiết đơn hàng.
 * - Sử dụng OrderFilterComponent để lọc, OrderListComponent để hiển thị danh sách,
 *   OrderDetailComponent để hiển thị chi tiết đơn hàng.
 * - Khi chọn đơn, sẽ hiển thị chi tiết; khi quay lại sẽ trả về danh sách.
 */
@Component({
	selector: 'app-order-list-tab',
	imports: [
		CommonModule,
		OrderListComponent,
		OrderDetailComponent,
		OrderFilterComponent,
	],
	templateUrl: './order-list-tab.component.html',
	styleUrl: './order-list-tab.component.scss',
})
export class OrderListTabComponent implements OnInit {
	/** Danh sách đơn hàng lấy từ API */
	orders: OrderResponse[] = [];

	/** Đơn hàng đang được chọn để xem chi tiết (nếu có) */
	selectedOrder: OrderResponse | null = null;

	/** Bộ lọc đơn hàng hiện tại (truyền cho API khi loadOrders) */
	filter: Partial<OrderFilterRequest> = {};

	/**
	 * Inject OrderService để thao tác với API đơn hàng
	 * @param orderService Service quản lý đơn hàng
	 */
	constructor(private orderService: OrderService) {}

	/**
	 * Lifecycle hook khởi tạo component, gọi loadOrders lần đầu.
	 */
	ngOnInit() {
		this.loadOrders();
	}

	/**
	 * Gọi API lấy danh sách đơn hàng với bộ lọc hiện tại.
	 * Kết quả lưu vào this.orders.
	 */
	loadOrders() {
		this.orderService
			.getOrdersAdmin({ page: 0, size: 20 })
			.subscribe((res: ApiResponse<Page<OrderResponse>>) => {
				this.orders = res.result.content || [];
			});
	}

	/**
	 * Xử lý khi người dùng chọn xem chi tiết một đơn hàng.
	 * Nếu đơn hàng đã có trong danh sách, set vào selectedOrder để hiển thị chi tiết.
	 * Nếu chưa có, có thể gọi API lấy chi tiết đơn hàng tại đây.
	 * @param orderId id của đơn hàng cần xem
	 */
	onViewOrder(orderId: number) {
		const found = this.orders.find(o => o.id === orderId);
		if (found) {
			this.selectedOrder = found;
		} else {
			// Use for call api order detail
		}
	}

	/**
	 * Xử lý khi người dùng nhấn "Quay lại" từ màn chi tiết đơn hàng.
	 * Đặt lại selectedOrder về null để quay về danh sách.
	 */
	onBackFromDetail() {
		this.selectedOrder = null;
	}

	/**
	 * Xử lý khi bộ lọc thay đổi từ component con OrderFilterComponent.
	 * Cập nhật filter và load lại danh sách đơn hàng.
	 * @param filterData object filter từ order-filter component
	 */
	onFilterChanged(filterData: Partial<OrderFilterRequest>) {
		this.filter = filterData;
		this.loadOrders();
	}
}
