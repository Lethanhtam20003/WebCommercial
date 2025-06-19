import { Injectable } from '@angular/core';
import { OrderResponse } from '../../models/response/order/order-response.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../../models/api-response.model';
import { URL_API } from '../../../shared/constants/url-api.constants';
import { AlertService } from '../alert.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PaymentService {
	confirmPayment(token: string, orderId: string): Observable<ApiResponse<String>> {
		const params = new HttpParams()
			.set('token', token)
			.set('orderId', Number(orderId));
		return this.http.post<ApiResponse<String>>(
			URL_API.confirmPayment,
			{},
			{
				params,
			}
		);
	}
	constructor(
		private http: HttpClient,
		private alertService: AlertService
	) {}

	payment(orderDetail: OrderResponse) {
		localStorage.setItem('orderId', orderDetail.id.toString());
		this.http
			.post<
				ApiResponse<string>
			>(URL_API.createPayment + `?amount=${orderDetail.discountedPrice}`, {})
			.subscribe({
				next: res => {
					const approvalLink = res.result;
					this.alertService.success(approvalLink);
					window.location.href = approvalLink;
				},
				error: err => {
					this.alertService.error(err.error.message);
				},
			});
	}
}
