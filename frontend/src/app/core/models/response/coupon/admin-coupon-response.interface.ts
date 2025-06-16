import { CouponStatus } from '../../../enum/coupon-status.enum';
import { CouponType } from '../../../enum/coupon-type.enum';

export interface AdminCouponResponse {
	id: number;
	code: string;
	discount: number;
	description: string;
	limitUsers: number;
	createdAt: string;
	expirationDate: string;
	status: CouponStatus | string;
	type: CouponType | string;
	priceCondition: number;
	minPrice: number;
}
