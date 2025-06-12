import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../../core/service/product.service';
import { ProductResponse } from '../../../core/models/response/product-response/productResponse';
import { RouterLink } from '@angular/router';
import { PageResponse } from '../../../core/models/response/product-response/product-response/page-response.interface';

@Component({
	standalone: true,
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
	imports: [NgIf, NgFor, RouterLink ,CommonModule],
})
export class ProductListComponent implements OnInit {
	constructor(private productService: ProductService) {}

	pageProducts?: PageResponse<ProductResponse>

	ngOnInit() {
		// Gọi hàm để lấy danh sách sản phẩm khi component được khởi tạo
		this.productService.fetchProducts();
		this.productService.pageProducts$.subscribe(data => {
			this.pageProducts = data;
		});
	}
	

	/**
	 * Thêm sản phẩm vào giỏ hàng
	 * @param product Sản phẩm được chọn
	 */
	addToCart(product: any): void {
	console.log(this.pageProducts)

		console.log('Đã thêm vào giỏ hàng:', product.name);
		// Thêm logic xử lý thêm vào giỏ hàng ở đây
	}
	
	/**
	 * Thêm sản phẩm vào danh sách yêu thích
	 * @param product Sản phẩm được chọn
	 */
	addToWishlist(product: any): void {
		console.log('Đã thêm vào danh sách yêu thích:', product.name);
		// Thêm logic xử lý thêm vào danh sách yêu thích
	}

	
}
