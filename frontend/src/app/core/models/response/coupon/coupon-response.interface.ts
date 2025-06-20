export interface CouponResponse {
	id: number;
	code: string;
	discount: number;
	description: string;
	expirationDate: string;

	expired?: boolean;
	remainingTime?: string;
	saved?: boolean;
}
