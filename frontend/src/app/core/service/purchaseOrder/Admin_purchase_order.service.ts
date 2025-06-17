import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseOrderResponse } from '../../models/response/purchase-order/purchaseOrderResponse';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { URL_API } from '../../../shared/constants/url-api.constants';
import { PurchaseRequest } from '../../models/request/importManagement/purchaseRequest.inteface';
import { InventoryResponse } from '../../models/response/purchase-order/InventoryResponse';
import { PageResponse } from '../../models/response/product-response/product-response/page-response.interface';

@Injectable({
	providedIn: 'root',
})
export class AdminPurchaseOrderService {
	constructor(private http: HttpClient) {}

	getPurchaseOrders(): Observable<ApiResponse<PurchaseOrderResponse[]>> {
		return this.http.get<ApiResponse<PurchaseOrderResponse[]>>(
			URL_API.purchaseOrders
		);
	}

	getPurchaseOrderById(
		id: number
	): Observable<ApiResponse<PurchaseOrderResponse>> {
		return this.http.get<ApiResponse<PurchaseOrderResponse>>(
			`${URL_API.purchaseOrders}/${id}`
		);
	}
	/**
	 * tạo đơn nhập hàng
	 */
	createPurchaseOrder(
		formData: any
	): Observable<ApiResponse<PurchaseOrderResponse>> {
		const param = {
			createAt: formData.createdAt,
			status: formData.status,
			items: formData.items,
		};

		return this.http.post<ApiResponse<PurchaseOrderResponse>>(
			`${URL_API.purchaseOrders}/${formData.supplierId}`,
			param
		);
	}

	updateStatus(
		orderId: number,
		status: string
	): Observable<ApiResponse<PurchaseOrderResponse>> {
		const param = {
			status: status,
		};
		return this.http.put<ApiResponse<PurchaseOrderResponse>>(
			`${URL_API.purchaseOrders}/${orderId}`,
			param
		);
	}
	getInventories(): Observable<ApiResponse<PageResponse<InventoryResponse>>> {
		return this.http.get<ApiResponse<PageResponse<InventoryResponse>>>(
			URL_API.inventory
		);
	}
}
