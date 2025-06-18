import { ProductResponse } from '../product-response/productResponse';

export interface PurchaseOrderItemResponse {
	id: number;
	product: ProductResponse;
	quantity: number;
	unitPrice: number;
}
