import { ProductResponse } from "../product-response/productResponse";

export interface InventoryResponse {
    id: number;
    product: ProductResponse;
    quantity: number;
}
