import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderDetailResponse } from '../../models/response/order-item-response.interface';
import { OrderDetailService } from '../order-detail.service';
import { AlertService } from '../alert.service';
import { getOrderDetailByOrderId } from '../../models/request/get-order-detail-request.interface';
import { ErrorMessageConstants } from '../../../shared/constants/error-message.constants';

@Injectable({ providedIn: 'root' })
export class OrderStateService {
	private orderDetailsSubject = new BehaviorSubject<OrderDetailResponse[]>([]);
	readonly orders$ = this.orderDetailsSubject.asObservable();
	constructor(
		private orderDetailService: OrderDetailService,
		private alert: AlertService
	) {}

	getOrderDetailByOrderId(request: getOrderDetailByOrderId): void {
		this.orderDetailService.getOrderDetailByOrderId(request).subscribe({
			next: res => this.orderDetailsSubject.next(res.result.content),
			error: err => {
				this.alert.error(ErrorMessageConstants.errorWhenLoadingOrderDetail);
				console.error(err);
			},
		});
	}
}
