import { Injectable } from '@angular/core';
import { OrderStatus } from '../enum/order-status.enum';
import { OrderResponse } from '../models/response/order/order-response.interface';
import { CouponResponse } from '../models/response/coupon/coupon-response.interface';

@Injectable({
	providedIn: 'root',
})
export class UtitlyService {
	capitalize(str: string): string {
		if (!str) return '';
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	convertDdMmYyyyToIso(dateStr: string): string {
		if (!dateStr) return '';

		// dateStr expected format: "dd/MM/yyyy"
		const [day, month, year] = dateStr.split('/');
		if (!day || !month || !year) {
			throw new Error('Invalid date format, expected dd/MM/yyyy');
		}
		// return ISO format: yyyy-MM-dd
		return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
	}

	convertIsoToDdMmYyyy(isoDateStr: string): string {
		if (!isoDateStr) return '';

		// isoDateStr expected format: "yyyy-MM-dd"
		const [year, month, day] = isoDateStr.split('-');
		if (!year || !month || !day) {
			throw new Error('Invalid ISO date format, expected yyyy-MM-dd');
		}

		// return format: "dd/MM/yyyy"
		return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
	}

	mapStatusToBackend(status: string): OrderStatus | string {
		switch (status.toLowerCase()) {
			case 'chờ xác nhận':
			case 'pending':
				return 'PENDING';

			case 'đã gửi':
			case 'shipped':
				return 'SHIPPED';

			case 'đã giao':
			case 'delivered':
				return 'DELIVERED';

			case 'đã huỷ':
			case 'đã hủy':
			case 'cancelled':
			case 'canceled':
				return 'CANCELLED';

			case 'Đã xác nhận':
			case 'đã xác nhận':
			case 'confirm':
			case 'confirmed':
				return 'CONFIRMED';

      case 'Tất cả':
      case 'Tất cả trạng thái':
      case 'tất cả trạng thái':
      case 'toàn bộ':
        return '';

			default:
				return '';
		}
	}

	mapStatusToVietnamese(status: OrderStatus | string): string {
		switch (status) {
			case 'PENDING':
				return 'Chờ xác nhận';
			case 'SHIPPED':
				return 'Đã gửi';
			case 'DELIVERED':
				return 'Đã giao';
			case 'CANCELLED':
				return 'Đã huỷ';
			case 'CONFIRMED':
				return 'Đã xác nhận';
			default:
				return status;
		}
	}

	getCellValue(row: any, key: string): any {
		if (!row || !key) return '-';

		const value = row[key];

		if (key === 'coupon') {
			return (value as CouponResponse)?.code || '-';
		}

		if (typeof value === 'object') {
			return JSON.stringify(value); // fallback nếu quên xử lý
		}

		return value ?? '-';
	}
}
