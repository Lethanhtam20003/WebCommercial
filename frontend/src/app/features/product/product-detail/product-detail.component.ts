import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../../core/models/response/product-response/productResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/service/product.service';
import { CommonModule, NgFor } from '@angular/common';
import { parseDescription } from '../../../core/utils/product-description.parser';
import { CartItem } from '../../../core/models/response/cart/cart-response.interface';
import { RouteLink } from '../../../shared/constants/route-link';
import { AlertService } from '../../../core/service/alert.service';
import { CartService } from '../../../core/service/cart/cart.service';
import { ListProductReferentComponent } from '../list-product-referent/list-product-referent.component';

@Component({
	standalone: true,
	imports: [NgFor, CommonModule,ListProductReferentComponent],
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
	product!: ProductResponse;
	selectedImage: string = '';
	quantity: number = 1;
	productDescription!: ProductDescription;
	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		private router: Router,
		private alertService: AlertService,
		private cartService: CartService
	) {}

	ngOnInit() {
		const productId = Number(this.route.snapshot.paramMap.get('id'));
		if (productId) {
			this.productService.getProductById(productId).subscribe({
				next: data => {
					this.product = data.result;

					this.selectedImage = this.product?.images[0] || '';
					this.productDescription = parseDescription(this.product.description);
					console.log('Product:', this.product);
				},
				error: err => console.error('Không tìm thấy sản phẩm', err),
			});
		}
	}

	increaseQty(): void {
		this.quantity++;
	}

	decreaseQty(): void {
		if (this.quantity > 1) {
			this.quantity--;
		}
	}
	addToCart(): void {
		this.cartService.addToCart(this.product.id);
	}
	buy(): void {
		const cartItem: CartItem[] = [
			{
				ProductId: this.product.id,
				name: this.product.name,
				productImg: this.product.images[0],
				quantity: 1,
				price: Number(this.product.price),
			},
		];

		this.router.navigate([RouteLink.checkoutRoute], {
			state: { cartItems: cartItem },
		});
	}
}
export interface ProductDescription {
	usage: string | null;
	style: string | null;
	highlights: string[];
	specifications: {
		material: string | null;
		colors: string | null;
		sizes: string | null;
	};
	moreInfo: string | null;
}
