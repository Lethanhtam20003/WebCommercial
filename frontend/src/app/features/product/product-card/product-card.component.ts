import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductResponse } from '../../../core/models/response/product-response/productResponse';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../../core/service/cart/cart.service';
import { AlertService } from '../../../core/service/alert.service';
import { RouteLink } from '../../../shared/constants/route-link';
import { CartItem } from '../../../core/models/response/cart/cart-response.interface';
import { nameTolabel } from '../../../core/utils/product-name.parser';
import { ProductLabel } from '../../../core/models/response/product-response/ProductLabel';

@Component({
	standalone: true,
	imports: [CommonModule, RouterModule],
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
	@Input() product!: ProductResponse;

	@Output() addToCartEvent = new EventEmitter<ProductResponse>();
	@Output() addToWishlistEvent = new EventEmitter<ProductResponse>();


	productLabel!: ProductLabel ;
 	discountedPrice!: number;

	constructor(
		private cartService: CartService,
		private alertService: AlertService,
		private router: Router
	) {}
	ngOnInit(): void {
		this.productLabel = nameTolabel(this.product.name, this.product.categories[0].name);
		this.discountedPrice = Number(this.product.price);
		if(this.product.promotions.length > 0){
			this.discountedPrice -= -Number(this.product.price) * (this.product.promotions[0].discountPercent / 100);;
		}
	}

	/**
	 * Thêm sản phẩm vào giỏ hàng
	 * @param product Sản phẩm được chọn
	 */
	addToCart(): void {
		this.cartService.addToCart(this.product.id);
	}

	/**
	 * Thêm sản phẩm vào danh sách yêu thích
	 * @param product Sản phẩm được chọn
	 */
	buy(): void {
		const cartItem: CartItem[] = [{
			ProductId: this.product.id,
			name: this.product.name,
			productImg: this.product.images[0],
			quantity: 1,
			price: Number(this.product.price),
		}];

		this.router.navigate([RouteLink.checkoutRoute], {
			state: { 
				cartItems: cartItem,
			 },
		});
	}
}
