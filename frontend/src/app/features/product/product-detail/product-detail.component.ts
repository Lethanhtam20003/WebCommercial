import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../../core/models/response/product-response/productResponse';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/service/product.service';
import { CommonModule, NgFor } from '@angular/common';
import { parseDescription } from '../../../core/utils/product-description.parser';

@Component({
	standalone: true,
	imports: [NgFor, CommonModule],
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
	product: ProductResponse | null = null;
	selectedImage: string = '';
	quantity: number = 1;
  productDescription!: ProductDescription;
	constructor(
		private route: ActivatedRoute,
		private productService: ProductService
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

