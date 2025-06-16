import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../core/models/response/cart/cart-response.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-cart',
	standalone: false,
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
	cartItems: CartItem[] = [];
	total: number = 0;

	ngOnInit(): void {
		console.log('🧨 CartComponent initialized');
		this.cartItems = [
			{
				id: 13,
				name: 'Áo Phông Cầu Lông Nam Động Lực Promax "Vàng - Xanh" DL-AP1369-10 - Hàng Chính Hãng',
				price: 175000,
				quantity: 2,
				productImg:
					'https://bizweb.dktcdn.net/thumb/medium/100/485/982/products/ao-nam-vang-xanh-4-1714116630289.jpg',
				category: 'Thời trang',
			},
			{
				id: 140,
				name: 'Giày bóng đá cỏ nhân tạo Nam Động Lực Jogarbola Racer JG-2223 "Cam" JG-2223-04 - Hàng Chính Hãng',
				price: 668000,
				quantity: 1,
				productImg:
					'https://bizweb.dktcdn.net/thumb/medium/100/485/982/products/tun-3871-46e95fa25c8a40dbaadd364-1703152503845.jpg',
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

	increaseQuantity(item: CartItem) {
		item.quantity++;
		this.updateTotal();
	}

	decreaseQuantity(item: CartItem) {
		if (item.quantity > 1) {
			item.quantity--;
			this.updateTotal();
		}
	}
}
