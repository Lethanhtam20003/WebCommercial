import { OrderStatus } from './../enum/order-status.enum';
import { ApiResponse } from './../models/api-response.model';
import { OrderFilterRequest } from '../models/request/order-filter-request.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderResponse } from '../models/response/order-response.interface';
import { URL_API } from '../../shared/constants/url-api.constants';
import { Observable } from 'rxjs';
import { Page } from '../models/response/page-response.interface';

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
		return this.http.get<ApiResponse<Page<OrderResponse>>>(
			URL_API.getOrders,
			{ params }
		);
	}

	// getOrdersAdmin(
	// 	request: OrderFilterRequest
	// ): Observable<ApiResponse<OrderResponse[]>> {
	// 	return this.http.get<ApiResponse<OrderResponse[]>>(
	// 		`${URL_API.getOrdersAdmin}`,
	// 		{
	// 			params: request as any,
	// 		}
	// 	);
	// }
}
