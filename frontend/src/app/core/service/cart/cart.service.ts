import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../models/response/cart/cart-response.interface';
import { ProductService } from '../product.service';

@Injectable({
	providedIn: 'root',
})
export class CartService implements OnInit {
	private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
	cartItems$ = this.cartItemsSubject.asObservable();
	flag = false;

	private readonly CART_KEY = 'cart';

	constructor(private productService: ProductService) {}
	ngOnInit(): void {}
	fetchCart(): void {
		this.cartItemsSubject.next([]);
		const cartInLocal = this.getCart();
		Object.keys(cartInLocal).forEach(productId => {
			this.productService.getProductById(Number(productId)).subscribe(respons => {
				const cartItem: CartItem = {
					ProductId: respons.result.id,
					name: respons.result.name,
					price: Number(respons.result.price),
					quantity: cartInLocal[Number(productId) ],
					productImg: respons.result.images[0],
				};
				this.cartItemsSubject.next([...this.cartItemsSubject.value, cartItem]);
			});
		});
	}

	/**
	 * Lấy giỏ hàng từ localStorage
	 */
	getCart(): Record<number, number> {
		const cartJson = localStorage.getItem(this.CART_KEY);
		return cartJson ? JSON.parse(cartJson) : {};
	}

	/**
	 * Lưu giỏ hàng vào localStorage
	 */
	private saveCart(cart: Record<number, number>): void {
		localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
	}

	/**
	 * Thêm sản phẩm vào giỏ (nếu đã có thì tăng số lượng)
	 */
	addToCart(productId: number, quantity: number = 1): void {
		const cart = this.getCart();
		cart[productId] = (cart[productId] || 0) + quantity;
		this.saveCart(cart);
	}

	/**
	 * Xóa 1 sản phẩm khỏi giỏ
	 */
	removeFromCart(productId: number): void {
		const cart = this.getCart();
		delete cart[productId];
		this.saveCart(cart);
	}

	/**
	 * Cập nhật số lượng cụ thể cho sản phẩm
	 */
	updateQuantity(productId: number, quantity: number): void {
		const cart = this.getCart();
		if (quantity <= 0) {
			delete cart[productId];
		} else {
			cart[productId] = quantity;
		}
		this.saveCart(cart);
	}

	/**
	 * Xóa toàn bộ giỏ
	 */
	clearCart(): void {
		localStorage.removeItem(this.CART_KEY);
	}
}
