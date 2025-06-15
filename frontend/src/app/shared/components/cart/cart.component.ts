import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../core/models/response/cart/cart-response.interface';

@Component({
	selector: 'app-cart',
	standalone: false,
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
	cartItems: CartItem[] = [];
	total: number = 0;

	ngOnInit(): void {
		this.cartItems = [
			{
				id: 1,
				name: 'Áo thể thao',
				price: 250000,
				quantity: 2,
				productImg: 'https://via.placeholder.com/80x80?text=Aó',
				category: 'Thời trang',
			},
			{
				id: 2,
				name: 'Bóng đá Futsal',
				price: 190000,
				quantity: 1,
				productImg: 'https://via.placeholder.com/80x80?text=Bóng',
				category: 'Bóng đá',
			},
		];
		this.updateTotal();
	}

	updateTotal(): void {
		this.total = this.cartItems.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
	}

	updateQuantity(item: CartItem) {
		if (item.quantity <= 0) item.quantity = 1;
	}

	getTotal(): number {
		return this.cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	}

	removeItem(item: CartItem) {
		this.cartItems = this.cartItems.filter(i => i.id !== item.id);
	}

	clearCart(): void {
		this.cartItems = [];
		this.total = 0;
	}

	checkout() {
		alert('Tính năng thanh toán chưa được hỗ trợ.');
	}
}
