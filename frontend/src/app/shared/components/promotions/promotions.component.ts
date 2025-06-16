import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-promotions',
	standalone: false,
	templateUrl: './promotions.component.html',
	styleUrl: './promotions.component.scss',
})
export class PromotionsComponent {
	@Input() coupons: any[] = [];
	buttonStates: { [couponId: string]: boolean } = {};

	ngOnInit(): void {
		setInterval(() => {
			this.coupons = this.coupons.map(c => {
				const diff = c.expireAt - Date.now();
				if (diff <= 0) {
					return { ...c, expire: true, remainingTime: 'Đã hết hạn' };
				}
				const m = Math.floor(diff / 60000);
				const s = Math.floor((diff % 60000) / 1000);
				return {
					...c,
					expire: false,
					remainingTime: `${this.pad(m)}:${this.pad(s)}`,
				};
			});
		}, 1000);
	}

	pad(n: number): string {
		return n < 10 ? '0' + n : '' + n;
	}

	saveCoupon(coupon: any) {
		// Giả lập lưu coupon
		coupon.saved = true;
	}

	onPress(couponId: string): void {
		this.buttonStates[couponId] = true;
	}

	onRelease(couponId: string): void {
		this.buttonStates[couponId] = false;
	}
}
