import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PromotionResponse } from '../../../core/models/response/promotions/promotion-response.interface';
import { PromotionService } from '../../../core/service/promotion.service';
import { catchError, of, Subscription } from 'rxjs';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { PromotionsComponent } from '../promotions/promotions.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-promotion-list',
	standalone: true,
	imports: [CommonModule, PromotionsComponent, TranslateModule],
	templateUrl: './promotion-list.component.html',
	styleUrl: './promotion-list.component.scss',
})
export class PromotionListComponent implements OnInit {
	promotionCoupons: PromotionResponse[] = [];
	private langChangeSubscription: Subscription;
	constructor(
		private promotionService: PromotionService,
		private translate: TranslateService,
    private cdr: ChangeDetectorRef
	) {
		console.log('PromotionList: Initial language:', this.translate.currentLang);
    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log('PromotionList: Language changed to:', event.lang);
      console.log('PromotionList: Current "promotions" translation:', this.translate.instant('promotions'));
      this.updatePromotionCoupons();
      this.cdr.detectChanges(); // Buộc chạy change detection
    });
	}
	ngOnInit(): void {
    this.loadPromotions();
  }

	private loadPromotions(): void {
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

  private updatePromotionCoupons(): void {
    // Cập nhật lại remainingTime cho các coupon hiện có
    this.promotionCoupons = this.promotionCoupons.map(coupon => {
      const endTimestamp = new Date(coupon.endDate).getTime();
      const remainingTime = this.getRemainingTime(endTimestamp);
      const expired = endTimestamp <= Date.now();

      return {
        ...coupon,
        expired,
        remainingTime,
      };
    });
    console.log('Promotions updated with new language:', this.promotionCoupons);
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
