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
	promotionCoupons: PromotionResponse[] = [
		// {
		//   promotionId: 'CPN01',
		//   title: 'Giảm 30k đơn từ 199k',
		//   description: 'Áp dụng cho toàn bộ sản phẩm',
		//   condition: 'Hết hạn trong vòng 10 phút',
		//   expireAt: Date.now() + 10 * 60 * 1000,
		//   saved: false,
		// },
		// {
		//   promotionId: 'CPN02',
		//   title: 'Freeship đơn từ 99k',
		//   description: 'Dành riêng cho khách mới',
		//   condition: 'Hết hạn trong vòng 5 phút',
		//   expireAt: Date.now() + 5 * 60 * 1000,
		//   saved: false,
		// },
	];
	constructor(private promotionService: PromotionService) {}
	ngOnInit(): void {
		this.promotionService
			.getAllPromotions()
			.pipe(
				catchError(err => {
					console.error('❌ Lỗi khi lấy danh sách khuyến mãi:', err);
					return of({ result: [] });
				})
			)
			.subscribe(data => {
				this.promotionCoupons = data.result.map(coupon => ({
					...coupon,
					expired: false,
					remainingTime: this.getRemainingTime(coupon.endDate),
				}));
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
