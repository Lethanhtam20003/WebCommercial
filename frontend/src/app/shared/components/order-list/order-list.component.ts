import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderResponse } from '../../../core/models/response/order-response.interface';

@Component({
	imports: [NgClass, CommonModule],
	standalone: true,
	selector: 'order-list',
	templateUrl: './order-list.component.html',
	styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
	@Input() orders: OrderResponse[] = [];
	@Output() viewOrder = new EventEmitter<number>();

	onView(orderId: number) {
		this.viewOrder.emit(orderId);
	}
}

export interface OrderItem {
  productName: string;
  productImage: string;
  quantity: number;
  price: number; // giá tại thời điểm thanh toán
}

