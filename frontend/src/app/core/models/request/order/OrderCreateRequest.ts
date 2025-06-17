import { CouponRequest } from "../coupon/CouponRequest";
import { OrderItemRequest } from "./OrderItemRequest";

export interface OrderCreateRequest {
    userId: number;
	note?: string;
	createdDate?: string; 
	orderItems: OrderItemRequest[];
	coupon?: CouponRequest;
}
