import { Component, Input } from '@angular/core';
import { PromotionResponse } from '../../../core/models/response/promotions/promotion-response.interface';

@Component({
	selector: 'app-promotions',
	standalone: false,
	templateUrl: './promotions.component.html',
	styleUrl: './promotions.component.scss',
})
export class PromotionsComponent {
	@Input() promotions: PromotionResponse[] = [];
	buttonStates: { [couponId: string]: boolean } = {};

	ngOnInit(): void {
		setInterval(() => {
			this.promotions = this.promotions.map(promotion  => {
				const diff = new Date(promotion.endDate).getTime() - Date.now();
				if (diff <= 0) {
					return { ...promotion , expire: true, remainingTime: 'Đã hết hạn' };
				}

				const m = Math.floor(diff / 60000);
				const s = Math.floor((diff % 60000) / 1000);

				return {
					...promotion ,
					expire: false,
					remainingTime: `${this.pad(m)}:${this.pad(s)}`,
				};
			});
		}, 1000);
	}


	pad(n: number): string {
		return n < 10 ? '0' + n : '' + n;
	}

	saveCoupon(promotion: PromotionResponse) {
		// Giả lập lưu coupon
		promotion.saved = true;
	}

	onPress(promotionId: number): void {
		this.buttonStates[promotionId] = true;
	}

	onRelease(promotionId: number): void {
		this.buttonStates[promotionId] = false;
	}
}
