import { SupplierResponse } from "../supplier-response/SupplierResponse";
import { PurchaseOrderItemResponse } from "./PurchaseOrderItemResponse";
import { PurchaseStatus } from "./PurchaseStatus";

export interface PurchaseOrderResponse {
    id: number;
    supplier: SupplierResponse;
    createdAt: Date;
    status: PurchaseStatus;
    totalPrice: number;
    items: PurchaseOrderItemResponse[];
}
