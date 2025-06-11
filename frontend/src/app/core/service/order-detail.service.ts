import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getOrderDetailByOrderId } from '../models/request/order/get-order-detail-request.interface';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Page } from '../models/response/page-response.interface';
import { URL_API } from '../../shared/constants/url-api.constants';
import { OrderDetailResponse } from '../models/response/order/order-item-response.interface';

@Injectable({
	providedIn: 'root',
})
export class OrderDetailService {
	constructor(private http: HttpClient) {}

	getOrderDetailByOrderId(
		request: getOrderDetailByOrderId
	): Observable<OrderDetailResponse[]> {
		const params = new HttpParams()
			.set('orderId', request.orderId.toString())
			.set('page', request.page.toString())
			.set('size', request.size.toString());

		return this.http
			.get<
				ApiResponse<Page<OrderDetailResponse>>
			>(URL_API.getOrderDetails, { params })
			.pipe(map(response => response.result.content));
	}
}
