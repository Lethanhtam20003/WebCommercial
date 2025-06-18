import { OrderStatus } from '../../../enum/order-status.enum';
import { CouponResponse } from '../coupon/coupon-response.interface';
import { OrderDetailResponse } from './order-item-response.interface';

export interface OrderResponse {
	id: number;
	totalPrice: number;
	discountedPrice: number;
	status: OrderStatus;
	note: string;
	createdDate: string;
	coupon?: CouponResponse;
	orderItems: OrderDetailResponse[];
	userId?: string;
	userName?: string;
	address: String;
}
