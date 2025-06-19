import { CouponStatus } from "../../../enum/coupon-status.enum";
import { CouponType } from "../../../enum/coupon-type.enum";

export interface CouponCreateRequest {
	code: string;
	discount: number;
	description: string;
	limitUsers: number;
	createdAt: string; // ISO 8601 format, e.g. "2025-06-19T14:00:00"
	expirationDate: string;
	status: CouponStatus;
	type: CouponType;
	priceCondition: number;
	minPrice: number;
}
