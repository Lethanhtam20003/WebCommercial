import { OrderStatus } from '../../../enum/order-status.enum';

export interface GetAllOrdersAdminRequest {
	userId?: number;
	status?: OrderStatus | string;
	username?: string;
	createdDateFrom?: string; // ISO format yyyy-MM-dd
	createdDateTo?: string; // ISO format yyyy-MM-dd
	totalPrice?: number;
	page?: number;
	size?: number;
}
