import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response.model';
import { CouponResponse } from '../../../core/models/response/coupon/coupon-response.interface';
import { OrderResponse } from '../../../core/models/response/order/order-response.interface';
import { Page } from '../../../core/models/response/page-response.interface';
import { OrderService } from '../../../core/service/order.service';
import { OrderListColumn } from '../../../shared/components/order-list/order-list-column.interface';
import { GetAllOrdersAdminRequest } from '../../../core/models/request/order/get-all-orders-admin-request.interface';

/**
 * Component hiển thị tab danh sách đơn hàng cho admin.
 * - Bao gồm bộ lọc đơn hàng, danh sách đơn hàng và chi tiết đơn hàng.
 * - Sử dụng OrderFilterComponent để lọc, OrderListComponent để hiển thị danh sách,
 *   OrderDetailComponent để hiển thị chi tiết đơn hàng.
 * - Khi chọn đơn, sẽ hiển thị chi tiết; khi quay lại sẽ trả về danh sách.
 */
@Component({
  standalone: false,
	selector: 'app-order-list-tab',
	templateUrl: './order-list-tab.component.html',
	styleUrls: ['./order-list-tab.component.scss'],
})
export class OrderListTabComponent implements OnInit {
	private filter$ = new BehaviorSubject<Partial<GetAllOrdersAdminRequest>>({});
	orders: OrderResponse[] = [];
	selectedOrder: OrderResponse | null = null;
	/**
	 * Cấu hình các cột hiển thị trong bảng danh sách đơn hàng.
	 */
	readonly adminOrderColumns: OrderListColumn[] = [
		{ key: 'index', label: '#', type: 'index' },
		{ key: 'id', label: 'Mã đơn', type: 'text' },
		{ key: 'userName', label: 'Người đặt', type: 'text' },
		{ key: 'createdDate', label: 'Ngày đặt', type: 'date' },
		{ key: 'status', label: 'Trạng thái', type: 'status' },
		{ key: 'totalPrice', label: 'Tổng tiền', type: 'currency' },
		{ key: 'discountedPrice', label: 'Giá sau giảm', type: 'currency' },
		{ key: 'note', label: 'Ghi chú', type: 'text' },
		{
			key: 'coupon',
			label: 'Mã giảm giá',
			type: 'text',
			formatFn: (value: CouponResponse) => (value ? value.code : ''),
		},
		{ key: 'action', label: 'Thao tác', type: 'action' },
	];
	constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.filter$
      .pipe(
        switchMap(filter =>
          this.orderService.getOrdersAdmin({ ...filter, page: 0, size: 10 })
        )
      )
      .subscribe((res: ApiResponse<Page<OrderResponse>>) => {
        this.orders = res.result.content || [];
      });
  }
	/**
	 * Xử lý khi người dùng chọn xem chi tiết một đơn hàng.
	 * Nếu đơn hàng đã có trong danh sách, set vào `selectedOrder`.
	 * Nếu chưa có, có thể mở rộng để gọi API lấy chi tiết đơn.
	 * @param orderId ID của đơn hàng được chọn
	 */
	onViewOrder(orderId: number) {
		const order = this.orders.find(o => o.id === orderId);
    if (order) {
      this.selectedOrder = order;
    } else {
      // Optional: gọi API lấy chi tiết
    }
	}
	/**
	 * Xử lý khi người dùng nhấn nút "Quay lại" từ trang chi tiết đơn hàng.
	 * Reset `selectedOrder` về null để hiển thị lại danh sách đơn hàng.
	 */
	onBackFromDetail() {
		this.selectedOrder = null;
	}
	onFilterChanged(newFilter: Partial<GetAllOrdersAdminRequest>): void {
    this.filter$.next(newFilter);
  }
}
