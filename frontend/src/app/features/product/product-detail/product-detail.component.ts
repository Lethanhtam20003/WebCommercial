import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../../core/models/response/product-response/productResponse';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/service/product.service';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
	product: ProductResponse | null = null;
	constructor(
		private route: ActivatedRoute,
		private productService: ProductService
	) {}

	ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => this.product = data.result,
        error: (err) => console.error('Không tìm thấy sản phẩm', err)
      });
    }
    console.log('Product:', this.product);
  }
}
