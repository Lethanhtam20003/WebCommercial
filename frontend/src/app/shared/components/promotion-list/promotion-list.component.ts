import { Component, OnInit } from '@angular/core';
import { PromotionResponse } from '../../../core/models/response/promotions/promotion-response.interface';
import { PromotionService } from '../../../core/service/promotion.service';
import { catchError, of } from 'rxjs';

@Component({
	selector: 'app-promotion-list',
	standalone: false,
	templateUrl: './promotion-list.component.html',
	styleUrl: './promotion-list.component.scss',
})
export class PromotionListComponent implements OnInit {
	promotionCoupons: PromotionResponse[] = [];
	constructor(private promotionService: PromotionService) {}
	ngOnInit(): void {
		this.promotionService
			.getActivePromotions()
			.pipe(
				catchError(err => {
					console.error('❌ Lỗi khi lấy danh sách khuyến mãi:', err);
					return of({ result: [] });
				})
			)
			.subscribe(data => {
				this.promotionCoupons = data.result.map(coupon => {
					const endTimestamp = new Date(coupon.endDate).getTime();
					const remainingTime = this.getRemainingTime(endTimestamp);
					const expired = endTimestamp <= Date.now();

					return {
						...coupon,
						expired,
						remainingTime,
						saved: false,
					};
				});
			});
	}

	getRemainingTime(expireAt: number): string {
		const msLeft = expireAt - Date.now();
		if (msLeft <= 0) return 'Đã hết hạn';

		const mins = Math.floor(msLeft / (60 * 1000));
		const secs = Math.floor((msLeft % (60 * 1000)) / 1000);
		return `Còn ${mins} phút ${secs < 10 ? '0' + secs : secs} giây`;
	}
}
