import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from '../../shared/constants/url-api.constants';
import { GetAllOrdersAdminRequest } from '../models/request/order/get-all-orders-admin-request.interface';
import { OrderFilterRequest } from '../models/request/order/order-filter-request.interface';
import { OrderResponse } from '../models/response/order/order-response.interface';
import { Page } from '../models/response/page-response.interface';
import { ApiResponse } from './../models/api-response.model';
import { OrderCreateRequest } from '../models/request/order/OrderCreateRequest';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	constructor(private http: HttpClient) {}

	getOrdersByStatus(
		request: OrderFilterRequest
	): Observable<ApiResponse<Page<OrderResponse>>> {
		return this.http.post<ApiResponse<Page<OrderResponse>>>(
			URL_API.getOrders,
			request
		);
	}

	getAllOrdersUser(
		userId: number,
		page = 0,
		size = 10
	): Observable<ApiResponse<Page<OrderResponse>>> {
		const params = new HttpParams()
			.set('userId', userId.toString())
			.set('page', page.toString())
			.set('size', size.toString());
		return this.http.get<ApiResponse<Page<OrderResponse>>>(URL_API.getOrders, {
			params,
		});
	}

	getOrdersAdmin(
		request: GetAllOrdersAdminRequest
	): Observable<ApiResponse<Page<OrderResponse>>> {
		return this.http.post<ApiResponse<Page<OrderResponse>>>(
			`${URL_API.getOrdersAdmin}`,
			request
		);
	}
	checkoutOrder(
		orderRequest: OrderCreateRequest
	): Observable<ApiResponse<OrderResponse>> {
		return this.http.post<ApiResponse<OrderResponse>>(
			URL_API.checkoutOrder,
			orderRequest
		);
	}

	cancelOrder(orderId: number): Observable<ApiResponse<OrderResponse>> {
		return this.http.put<ApiResponse<OrderResponse>>(
			`${URL_API.getOrders}/${orderId}/cancel`,
			{}
		);
	}
}
