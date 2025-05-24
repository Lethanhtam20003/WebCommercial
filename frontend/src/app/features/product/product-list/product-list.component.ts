import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../../core/service/product.service';
import { ProductResponse } from '../../../core/models/productResponse';
import { RouterLink } from '@angular/router';

@Component({
	standalone: true,
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
	imports: [NgIf, NgFor, RouterLink],
})
export class ProductListComponent implements OnInit {
	constructor(private productService: ProductService) {}

	products: ProductResponse[] = [];

	ngOnInit() {
		// Gọi hàm để lấy danh sách sản phẩm khi component được khởi tạo
		this.productService.products$.subscribe(data => {
			this.products = data;
		});
		console.log('Products:', this.products);
		this.productService.fetchProducts();
	}
	

	/**
	 * Thêm sản phẩm vào giỏ hàng
	 * @param product Sản phẩm được chọn
	 */
	addToCart(product: any): void {
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
