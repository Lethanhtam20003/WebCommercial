import { Component, Input } from '@angular/core';
import { PromotionResponse } from '../../../core/models/response/promotions/promotion-response.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-promotions',
	imports: [CommonModule, TranslateModule],
	templateUrl: './promotions.component.html',
	styleUrl: './promotions.component.scss',
})
export class PromotionsComponent {
	@Input() promotions: PromotionResponse[] = [];
	buttonStates: { [couponId: string]: boolean } = {};
	private intervalSub?: Subscription;
	private langChangeSub?: Subscription;

	constructor(private translate: TranslateService) {}

	ngOnInit(): void {
		this.updateRemainingTimes();

		// Cập nhật mỗi giây
		this.intervalSub = interval(1000).subscribe(() => {
			this.updateRemainingTimes();
		});

		// Lắng nghe đổi ngôn ngữ để update lại "Đã hết hạn"
		this.langChangeSub = this.translate.onLangChange.subscribe(() => {
			this.updateRemainingTimes();
		});
	}

	private updateRemainingTimes(): void {
		this.promotions = this.promotions.map(promotion => {
			const diff = new Date(promotion.endDate).getTime() - Date.now();
			if (diff <= 0) {
				return {
					...promotion,
					expired: true,
					remainingTime: this.translate.instant('promotion.expired'),
				};
			}

			const m = Math.floor(diff / 60000);
			const s = Math.floor((diff % 60000) / 1000);

			return {
				...promotion,
				expired: false,
				remainingTime: `${this.pad(m)}:${this.pad(s)}`,
			};
		});
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
