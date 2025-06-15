import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseOrderResponse } from '../../models/response/purchase-order/purchaseOrderResponse';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { URL_API } from '../../../shared/constants/url-api.constants';

@Injectable({
  providedIn: 'root'
})
export class Admin_purchase_orderService {
purchaseOrders!: PurchaseOrderResponse[];
purchaseOrder!: PurchaseOrderResponse;

constructor(
  private http: HttpClient,

) { }

getPurchaseOrders(): Observable<ApiResponse<PurchaseOrderResponse[]>> {
  return this.http.get<ApiResponse<PurchaseOrderResponse[]>>(URL_API.purchaseOrders);
}



}
