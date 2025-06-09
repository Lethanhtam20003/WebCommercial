import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderResponse } from '../../../core/models/response/order/order-response.interface';
import { OrderDetailResponse } from '../../../core/models/response/order/order-item-response.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'order-detail',
  imports: [CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  /**
   * Input nhận dữ liệu đơn hàng.
   */
  @Input() order: OrderResponse | null = null;

  /**
   * Input nhận danh sách sản phẩm của đơn hàng.
   */
  @Input() orderItems: OrderDetailResponse[] = [];

  /**
   * Input xác định người dùng hiện tại có phải admin hay không.
   */
  @Input() isAdmin = false;

  /**
   * Output sự kiện "trở lại".
   */
  @Output() back = new EventEmitter<void>();

  /**
   * Tổng tiền của đơn hàng (dùng trong template).
   */
  get formattedTotalPrice(): number {
    return this.order?.totalPrice ?? 0;
  }

  /**
   * Gọi khi nhấn nút quay lại.
   */
  onBack(): void {
    this.back.emit();
  }
}
