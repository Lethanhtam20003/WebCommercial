import { CouponStatus } from '../../../enum/coupon-status.enum';
import { CouponType } from '../../../enum/coupon-type.enum';

export interface UpdateCouponRequest {
	id: number;
	discount: number;
	description: string;
	limitUsers: number;
	expirationDate: string;
	status: CouponStatus;
	type: CouponType;
	priceCondition: number;
	minPrice: number;
}
