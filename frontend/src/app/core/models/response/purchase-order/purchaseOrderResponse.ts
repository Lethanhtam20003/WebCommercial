import { PurchaseStatus } from "../../../enum/PurchaseStatus";
import { SupplierResponse } from "../supplier-response/SupplierResponse";
import { PurchaseOrderItemResponse } from "./PurchaseOrderItemResponse";

export interface PurchaseOrderResponse {
    id: number;
    supplier: SupplierResponse;
    createdAt: Date;
    status: PurchaseStatus;
    totalPrice: number;
    items: PurchaseOrderItemResponse[];
}
