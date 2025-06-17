import { PurchaseStatus } from "../../../enum/PurchaseStatus";
import { PurchaseItem } from "./PurchaseItem";

export interface PurchaseRequest {
    supplierId : number;
    createAt: Date;
    status: PurchaseStatus;
    items: PurchaseItem[];

}
