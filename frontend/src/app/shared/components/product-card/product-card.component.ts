import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductResponse } from '../../../core/models/response/product-response/productResponse';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../../core/service/cart/cart.service';
import { AlertService } from '../../../core/service/alert.service';

@Component({
	standalone: true,
	imports: [CommonModule, RouterModule],
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
	@Input() product!: ProductResponse;

	@Output() addToCartEvent = new EventEmitter<ProductResponse>();
	@Output() addToWishlistEvent = new EventEmitter<ProductResponse>();

	constructor(
		private cartService: CartService,
		private alertService: AlertService,
		private router: Router
	) {}

	/**
	 * Thêm sản phẩm vào giỏ hàng
	 * @param product Sản phẩm được chọn
	 */
	addToCart(): void {
		console.log('Đã thêm vào giỏ hàng:', this.product.name);
		this.cartService.addToCart(this.product.id);
		this.alertService.success('Đã thêm vào giỏ hàng');
	}

	/**
	 * Thêm sản phẩm vào danh sách yêu thích
	 * @param product Sản phẩm được chọn
	 */
	buy(): void {
		this.router.navigate(['/checkout/' + this.product.id]);
	}
}
