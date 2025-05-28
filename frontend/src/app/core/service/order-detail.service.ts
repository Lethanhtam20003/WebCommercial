import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getOrderDetailByOrderId } from '../models/request/get-order-detail-request.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Page } from '../models/response/page-response.interface';
import { OrderDetailResponse } from '../models/response/order-item-response.interface';
import { URL_API } from '../../shared/constants/url-api.constants';

@Injectable({
	providedIn: 'root',
})
export class OrderDetailService {
	constructor(private http: HttpClient) {}

	getOrderDetailByOrderId(
		request: getOrderDetailByOrderId
	): Observable<ApiResponse<Page<OrderDetailResponse>>> {
		const params = new HttpParams()
			.set('orderId', request.orderId.toString())
			.set('page', request.page.toString())
			.set('size', request.size.toString());
		return this.http.get<ApiResponse<Page<OrderDetailResponse>>>(
			URL_API.getOrders,
			{ params }
		);
	}
}
