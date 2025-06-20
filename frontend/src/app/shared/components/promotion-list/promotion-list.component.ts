import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { catchError, of, Subscription } from 'rxjs';
import { CouponResponse } from '../../../core/models/response/coupon/coupon-response.interface';
import { PromotionResponse } from '../../../core/models/response/promotions/promotion-response.interface';
import { CouponService } from '../../../core/service/coupon.service';
import { PromotionService } from '../../../core/service/promotion.service';
import { PromotionsComponent } from '../promotions/promotions.component';

@Component({
	selector: 'app-promotion-list',
	standalone: true,
	imports: [CommonModule, PromotionsComponent, TranslateModule],
	templateUrl: './promotion-list.component.html',
	styleUrl: './promotion-list.component.scss',
})
export class PromotionListComponent implements OnInit {
	couponList: CouponResponse[] = [];
	private langChangeSubscription: Subscription;
	constructor(
		private promotionService: PromotionService,
		private couponService: CouponService,
		private translate: TranslateService,
		private cdr: ChangeDetectorRef
	) {
		console.log('PromotionList: Initial language:', this.translate.currentLang);
		this.langChangeSubscription = this.translate.onLangChange.subscribe(
			(event: LangChangeEvent) => {
				console.log('PromotionList: Language changed to:', event.lang);
				console.log(
					'PromotionList: Current "promotions" translation:',
					this.translate.instant('promotions')
				);
				this.updateCouponList();
				this.cdr.detectChanges(); // Buộc chạy change detection
			}
		);
	}
	ngOnInit(): void {
		this.loadCoupons();
	}

	private loadCoupons(): void {
		this.couponService
			.getTop5Coupon()
			.pipe(
				catchError(err => {
					console.error('❌ Lỗi khi lấy danh sách coupon:', err);
					return of({ result: [] });
				})
			)
			.subscribe(data => {
				this.couponList = data.result.map(coupon => {
					const endTimestamp = new Date(coupon.expirationDate).getTime();
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

	private updateCouponList(): void {
		this.couponList = this.couponList.map(coupon => {
			const endTimestamp = new Date(coupon.expirationDate).getTime();
			const remainingTime = this.getRemainingTime(endTimestamp);
			const expired = endTimestamp <= Date.now();

			return {
				...coupon,
				expired,
				remainingTime,
			};
		});
	}

	getRemainingTime(expireAt: number): string {
		const msLeft = expireAt - Date.now();
		if (msLeft <= 0) {
			return this.translate.instant('promotion.expired');
		}

		const mins = Math.floor(msLeft / (60 * 1000));
		const secs = Math.floor((msLeft % (60 * 1000)) / 1000);

		return this.translate.instant('promotion.remainingTime', {
			minutes: mins,
			seconds: secs < 10 ? '0' + secs : secs,
		});
	}

	ngOnDestroy(): void {
		// Hủy subscription để tránh rò rỉ bộ nhớ
		this.langChangeSubscription.unsubscribe();
	}
}
