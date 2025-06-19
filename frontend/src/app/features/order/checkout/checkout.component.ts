import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../core/service/alert.service';
import { CartItem } from '../../../core/models/response/cart/cart-response.interface';
import { CouponResponse } from '../../../core/models/response/coupon/coupon-response.interface';
import { UserResponse } from '../../../core/models/response/user/user-response.interface';
import { UserService } from '../../../core/service/user.service';
import { UserProfile } from '../../../core/models/response/user/user-profile-response.model';
import { OrderCreateRequest } from '../../../core/models/request/order/OrderCreateRequest';
import { CouponService } from '../../../core/service/coupon.service';
import { OrderService } from '../../../core/service/order.service';
import { RouteLink } from '../../../shared/constants/route-link';
import { state } from '@angular/animations';
import { CartService } from '../../../core/service/cart/cart.service';
@Component({
	standalone: true,
	imports: [CommonModule, FormsModule],

	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
	RouteLink = RouteLink;
	private user!: UserProfile;
	cartItems: CartItem[] = [];
	total: number = 0;
	address: AddressResponse | null = null;

	orderCreateRequest!: OrderCreateRequest;

	constructor(
		private router: Router,
		private alert: AlertService,
		private userService: UserService,
		private coupons: CouponService,
		private orderService: OrderService,
		private cartService: CartService,
		private route: ActivatedRoute
	) {
		const nav = this.router.getCurrentNavigation();
		this.cartItems = nav?.extras?.state?.['cartItems'] || [];
		this.updateTotal();
	}
	ngOnInit(): void {
		this.userService.getCurrentInfo().subscribe(res => {
			this.user = res;
			console.log(this.user);
			this.address = this.mapAdress(res);
		});
	}

	updateTotal(): void {
		this.total = this.cartItems.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
	}

	confirmOrder() {
		if(!this.address){
			this.alert.warning("Vui lòng nhập địa chỉ nhận hàng");
			return;
		}
		if(!this.user.phone){
			this.alert.warning("Vui lòng nhập số điện thoại");
			return;
		}
		if(!this.user.fullName){
			this.alert.warning("Vui lòng nhập tên người nhận");
			return;
		}
		this.alert
			.loading(
				'Hệ thống đang tạo đơn hàng, vui lòng đợi một chút',
				'Đang tạo đơn hàng...'
			)
			.then(() => {
				this.orderCreateRequest = {
					userId: this.user.id,
					note: '',
					createdDate: new Date().toISOString(),
					address: this.address?.address ?? '',
					orderItems: this.cartItems.map(item => {
						return {
							productId: item.ProductId,
							quantity: item.quantity,
							price: item.price,
						};
					}),
					coupon: this.selectedCoupon
						? { code: this.selectedCoupon.code }
						: undefined,
				};
				console.log(this.orderCreateRequest);
				this.orderService.checkoutOrder(this.orderCreateRequest).subscribe({
					next: res => {
						if (res.code === 200) {
							this.cartService.clearCart();
							this.router.navigate(['order-detail', res.result.id]);
						}
					},
					error: err => {
						this.alert.error(err.error.message);
					},
				});
			});
	}
	cancelOrder() {
		this.router.navigate(['/home']);
	}

	editAddress() {
		this.alert.changeAddress().then(res => {
			if (res) {
				console.log(res.isConfirmed);
				if (res.isConfirmed) {
					this.user.address = res.value?.fullAddress ?? null;
					this.address = this.mapAdress(this.user);	
				}
			}
		});
	}

	mapAdress(user: UserProfile): AddressResponse | null {
		if (!user) {
			return null;
		}
		if (!user.address) {
			return null;
		}

		return {
			recipientName: user.fullName || '',
			phoneNumber: user.phone || '',
			address: user.address,
		};
	}

	couponCode = '';
	selectedCoupon: CouponResponse | null = null;
	discount: number = 0;

	applyCoupon() {
		// Ví dụ: danh sách coupon mock (hoặc lấy từ API)
		const coupons: CouponResponse[] = [
			{
				id: 1,
				code: 'SALE20',
				discountPercentage: 20,
				description: '',
				expirationDate: '2025-12-31',
			},
			// ...
		];

		const found = coupons.find(
			c => c.code === this.couponCode.trim().toUpperCase()
		);
		if (found) {
			this.selectedCoupon = found;
			this.discount = (this.total * found.discountPercentage) / 100;
		} else {
			this.selectedCoupon = null;
			this.discount = 0;
			alert('Mã giảm giá không hợp lệ.');
		}
	}

	buttonStates: { [key: number]: boolean } = {};

	onPress(id: number) {
		this.buttonStates[id] = true;
	}

	onRelease(id: number) {
		this.buttonStates[id] = false;
	}
}
export interface AddressResponse {
	recipientName: string;
	phoneNumber: string;
	address: string;
}
