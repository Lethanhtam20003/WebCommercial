import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../core/models/api-response.model';
import { OrderService } from '../../../core/service/order.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrderListComponent } from '../order-list/order-list.component';
import { Observable } from 'rxjs';
import { Page } from '../../../core/models/response/page-response.interface';
import { OrderResponse } from '../../../core/models/response/order/order-response.interface';

@Component({
	selector: 'app-order-list-tab',
	imports: [CommonModule, OrderListComponent, OrderDetailComponent],
	templateUrl: './order-list-tab.component.html',
	styleUrl: './order-list-tab.component.scss',
})
export class OrderListTabComponent implements OnInit {
	orders: OrderResponse[] = [];
	selectedOrder: OrderResponse | null = null;
	constructor(private orderService: OrderService) {}

	ngOnInit() {
		this.loadOrders();
	}

	loadOrders() {
		this.orderService
			.getOrdersAdmin({ page: 0, size: 20 })
			.subscribe((res: ApiResponse<Page<OrderResponse>>) => {
				this.orders = res.result.content || [];
			});
	}

	onViewOrder(orderId: number) {
		const found = this.orders.find(o => o.id === orderId);
		if (found) {
			this.selectedOrder = found;
		} else {
			// Use for call api order detail
		}
	}

	onBackFromDetail() {
		this.selectedOrder = null;
	}
}
