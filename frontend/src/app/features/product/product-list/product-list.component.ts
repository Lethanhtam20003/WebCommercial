import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../../core/service/product.service';
import { ProductResponse } from '../../../core/models/response/product-response/productResponse';
import { RouterLink } from '@angular/router';
import { PageResponse } from '../../../core/models/response/product-response/product-response/page-response.interface';
import { ProductFilter } from '../../../core/models/request/filter/productFilter';

@Component({
	standalone: true,
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
	imports: [NgIf, NgFor, RouterLink, CommonModule],
})
export class ProductListComponent implements OnInit {
	@Input() productFilter!: ProductFilter;
	constructor(private productService: ProductService) {
		this.productFilter = {
			page: 0,
			size: 16,
		};
	}

	pageProducts?: PageResponse<ProductResponse>;

	ngOnInit() {
		console.log(this.productFilter);

		// Gọi hàm để lấy danh sách sản phẩm khi component được khởi tạo
		this.productService.fetchProducts(this.productFilter);
		this.productService.pageProducts$.subscribe(data => {
			this.pageProducts = data;
		});
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes['productFilter'] && this.productFilter) {
			this.productFilter.page = this.productFilter.page || 0;
			this.productService.fetchProducts(this.productFilter);
		}
	}
	/**
	 * Thêm sản phẩm vào giỏ hàng
	 * @param product Sản phẩm được chọn
	 */
	addToCart(product: any): void {
		console.log(this.pageProducts);

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
	showPagination() {
		return this.pageProducts && this.pageProducts.page.totalPages > 1;
	}
	canPrevious() {
		return this.productFilter && this.productFilter.page > 1;
	}
	canNext() {
		return (
			this.productFilter &&
			this.pageProducts &&
			this.productFilter.page < this.pageProducts.page.totalPages - 1
		);
	}
	getPageNumbers(): number[] {
		const totalPages = this.pageProducts?.page.totalPages || 0;
		return Array.from({ length: totalPages }, (_, i) => i);
	}
	goToPage(page: number) {
		console.log(this.productFilter.page);
		if (this.productFilter && this.productFilter.page < 1 && page === -1) {
			return;
		}
		console.log(page);
		if (page === -1) {
			page = this.productFilter.page - 1;
		} else if (page === -2) {
			page = this.productFilter.page + 1;
		}

		this.productFilter.page = page;
		this.productService.fetchProducts(this.productFilter);
	}
}
