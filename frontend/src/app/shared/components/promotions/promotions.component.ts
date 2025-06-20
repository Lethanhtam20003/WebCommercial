import { PurchaseItem } from './../../../core/models/request/importManagement/PurchaseItem';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PromotionResponse } from '../../../core/models/response/promotions/promotion-response.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CouponResponse } from '../../../core/models/response/coupon/coupon-response.interface';
import { CouponService } from '../../../core/service/coupon.service';
import { AlertService } from '../../../core/service/alert.service';
import { UserService } from '../../../core/service/user.service';
import { UserProfile } from '../../../core/models/response/user/user-profile-response.model';

@Component({
	selector: 'app-promotions',
	imports: [CommonModule, TranslateModule],
	templateUrl: './promotions.component.html',
	styleUrl: './promotions.component.scss',
})
export class PromotionsComponent implements OnInit {
	@Input() coupons: CouponResponse[] = [];
	@Input() userId?: number;
	@Output() couponSaved = new EventEmitter<string>(); // string là couponCode

	buttonStates: { [couponId: string]: boolean } = {};
	private intervalSub?: Subscription;
	private langChangeSub?: Subscription;
	user: UserProfile | null = null;

	constructor(
		private translate: TranslateService,
		private couponService: CouponService,
		private alert: AlertService,
		private userService: UserService
	) {}

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
		this.coupons = this.coupons.map(coupon => {
			const diff = new Date(coupon.expirationDate).getTime() - Date.now();

			if (diff <= 0) {
				return {
					...coupon,
					expired: true,
					remainingTime: this.translate.instant('promotion.expired'),
				};
			}

			const m = Math.floor(diff / 60000);
			const s = Math.floor((diff % 60000) / 1000);

			return {
				...coupon,
				expired: false,
				remainingTime: `${this.pad(m)}:${this.pad(s)}`,
			};
		});
	}

	pad(n: number): string {
		return n < 10 ? '0' + n : '' + n;
	}

	saveCoupon(coupon: CouponResponse): void {
		if (coupon.saved || !this.userId) return;

		this.couponService.saveCoupon(coupon.code, this.userId).subscribe({
			next: res => {
				coupon.saved = true;
				this.couponSaved.emit(coupon.code); // 👈 Emit về cha
				this.alert.success('Đã lưu mã giảm giá');
			},
			error: err => {
				this.alert.error('Không thể lưu mã này');
				console.error(err);
			},
		});
	}

	onPress(couponId: number): void {
		this.buttonStates[couponId] = true;
	}

	onRelease(couponId: number): void {
		this.buttonStates[couponId] = false;
	}
}
