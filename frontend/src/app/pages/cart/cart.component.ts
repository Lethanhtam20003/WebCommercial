import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../core/models/response/cart/cart-response.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../core/service/alert.service';
import { Router } from '@angular/router';
import { RouteLink } from '../../shared/constants/route-link';
import { CartService } from '../../core/service/cart/cart.service';
import { CartItemComponent } from '../../features/cart/cartItem/cartItem.component';

@Component({
	standalone: true,
	imports: [CommonModule, FormsModule, CartItemComponent],
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
	cartItems: CartItem[] = [];
	total: number = 0;
	isSelectAll: boolean = true;

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

	updateQuantity(event: { productId: number; quantity: number }) {
		const item = this.cartItems.find(i => i.ProductId === event.productId);
		if (item) {
			item.quantity = event.quantity;
		}
		this.cartService.updateQuantity(event.productId, event.quantity);
	}


	updateTotal(): void {
		this.total = this.cartItems
			.filter(item => item.isSelected)
			.reduce((sum, item) => sum + item.price * item.quantity, 0);
			console.log("oke"+this.cartItems.filter(item => item.isSelected))
	}
	
	removeItem(productId: number) {
		this.cartItems = this.cartItems.filter(i => i.ProductId !== productId);
		this.cartService.removeFromCart(productId);
		this.updateTotal();
	}

	getTotal(): number {
		return this.cartItems.
		filter(item => item.isSelected).
		reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	}

	toggleSelectAll(): void {
		this.cartItems = this.cartItems.map(item => ({
			...item,
			isSelected: this.isSelectAll,
		}));
		this.updateTotal();
	}
	updateSelectAllStatus(): void {
		this.isSelectAll = this.cartItems.every(item => item.isSelected);
	}
	/**
	 * thanh toan
	 */
	paymenthandler() {
		const selectedItems = this.cartItems.filter(item => item.isSelected);

		this.router.navigate([RouteLink.checkoutRoute], {
			state: { cartItems: selectedItems,
				isCard: true,
			 },
		});
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
