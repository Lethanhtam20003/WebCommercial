import { CouponStatus } from '../../../enum/coupon-status.enum';
import { CouponType } from '../../../enum/coupon-type.enum';

export interface GetAllCouponRequest {
	page: number;
	size: number;

	code?: string;
	status?: CouponStatus | string; // Enum tương ứng CouponStatus
	minDiscount?: number;
	createdAt?: string; // ISO format: 'yyyy-MM-dd'

	minPrice?: number;
	priceCondition?: number;
	type?: CouponType | string; // Enum tương ứng CouponType
}
