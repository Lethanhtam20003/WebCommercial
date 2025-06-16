import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseOrderResponse } from '../../models/response/purchase-order/purchaseOrderResponse';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { URL_API } from '../../../shared/constants/url-api.constants';
import { PurchaseRequest } from '../../models/request/importManagement/purchaseRequest.inteface';

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
			`${URL_API.purchaseOrders}/${formData.supplierId}`
,
			param
		);
	}
}
