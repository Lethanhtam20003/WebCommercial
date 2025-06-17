import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../core/models/response/cart/cart-response.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../core/service/alert.service';
import { Router } from '@angular/router';
import { RouteLink } from '../../shared/constants/route-link';
import { CartService } from '../../core/service/cart/cart.service';

@Component({
	standalone: true,
	imports: [CommonModule, FormsModule],
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
	cartItems: CartItem[] = [];
	total: number = 0;

	constructor(
		private alert: AlertService,
		private cartService: CartService,
		private router: Router
	) {}
	ngOnInit(): void {
		this.cartService.fetchCart();
		this.cartService.cartItems$.subscribe(cartItems => {
			this.cartItems = cartItems;
			this.updateTotal();
		});
	}

	updateTotal(): void {
		this.total = this.cartItems.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
	}

	// updateQuantity(item: CartItem) {
	// 	if (item.quantity <= 0){
	// 		item.quantity = 1;
	// 	}
	// }

	getTotal(): number {
		return this.cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	}

	removeItem(item: CartItem) {
		this.cartItems = this.cartItems.filter(i => i.ProductId !== item.ProductId);
		this.cartService.removeFromCart(item.ProductId);
	}

	clearCart(): void {
		this.cartItems = [];
		this.total = 0;
	}

	order() {
		// this.alert.loading(
		// 	ResponseMessage.navigatingToOrderPagePleaseWaitAMinute,
		// 	ResponseMessage.navigateToOrderPage
		// );
		this.router.navigate([RouteLink.orderRoute], {
			state: { cartItems: this.cartItems },
		});
	}

	increaseQuantity(item: CartItem) {
		item.quantity++;
		this.cartService.updateQuantity(item.ProductId, item.quantity);
		this.updateTotal();
	}

	decreaseQuantity(item: CartItem) {
		if (item.quantity > 1) {
			item.quantity--;
			this.cartService.updateQuantity(item.ProductId, item.quantity);
			this.updateTotal();
		}
	}
	/**
	 * thực hiện ấn thả đổi màu
	 */
	buttonStates: { [couponId: number]: boolean } = {};


	onPress(couponId: number): void {
		this.buttonStates[couponId] = true;
	}

	onRelease(couponId: number): void {
		this.buttonStates[couponId] = false;
	}
}
