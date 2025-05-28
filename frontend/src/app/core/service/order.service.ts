import { OrderStatus } from './../enum/order-status.enum';
import { ApiResponse } from './../models/api-response.model';
import { OrderFilterRequest } from '../models/request/order-filter-request.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderResponse } from '../models/response/order-response.interface';
import { URL_API } from '../../shared/constants/url-api.constants';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	constructor(private http: HttpClient) {}

	getOrdersByStatus(request: OrderFilterRequest): Observable<ApiResponse<OrderResponse[]>> {
		return this.http.post<ApiResponse<OrderResponse[]>>(URL_API.getOrders, request);
	}

	getAllOrdersUser(userId: number): Observable<ApiResponse<OrderResponse[]>> {
		return this.http.get<ApiResponse<OrderResponse[]>>(`${URL_API.getOrders}/${userId}`);
	}

	getOrdersAdmin(request: OrderFilterRequest): Observable<ApiResponse<OrderResponse[]>> {
		return this.http.get<ApiResponse<OrderResponse[]>>(`${URL_API.getOrdersAdmin}`, {
			params: request as any,
		});
	}
}
