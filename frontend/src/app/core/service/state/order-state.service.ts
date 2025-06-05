import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorMessageConstants } from '../../../shared/constants/error-message.constants';
import { OrderFilterRequest } from '../../models/request/order/order-filter-request.interface';
import { OrderResponse } from '../../models/response/order/order-response.interface';
import { AlertService } from '../alert.service';
import { OrderService } from '../order.service';

@Injectable({ providedIn: 'root' })
export class OrderStateService {
	private ordersSubject = new BehaviorSubject<OrderResponse[]>([]);
	readonly orders$ = this.ordersSubject.asObservable();

	constructor(
		private orderService: OrderService,
		private alert: AlertService,
	) {}

	loadOrdersForUser(userId: number): void {
		this.orderService.getAllOrdersUser(userId).subscribe({
			next: res => this.ordersSubject.next(res.result.content),
			error: err => {
				this.alert.error(ErrorMessageConstants.errorWhenLoadingUserOrder);
				console.error(err);
			},
		});
	}

	loadOrdersByStatus(request: OrderFilterRequest): void {
		this.orderService.getOrdersByStatus(request).subscribe({
			next: res => this.ordersSubject.next(res.result.content),
			error: err => {
				this.alert.error(ErrorMessageConstants.errorWhenLoadingUserOrder);
				console.error(err);
			},
		});
	}

	// loadOrdersForAdmin(request: OrderFilterRequest): void {
	// 	this.orderService.getOrdersAdmin(request).subscribe({
	// 		next: orders => this.ordersSubject.next(orders.result),
	// 		error: err =>
	// 			console.error(ErrorMessageConstants.errorWhenLoadingAdminOrder, err),
	// 	});
	// }
}
