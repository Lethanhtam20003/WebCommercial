import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AdminProductService } from '../../../service/admin-product.service';
import { ProductResponse } from '../../../../../core/models/response/product-response/productResponse';
import { ProductStatusType } from '../../../models/product-status.enum';
import { PageResponse } from '../../../models/product-response/page-response.interface';
import {
	PageRequest,
	SortDirection,
} from '../../../models/request/pageRequest.interface';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoryService } from '../../../service/admin-category.service';
import { category } from '../../../models/category';

@Component({
	standalone: true,
	imports: [
		FormsModule,
		CommonModule,
		RouterLink,
		RouterModule,
		NgIf,
		NgSelectModule,
	],
	selector: 'app-admin-product-list',
	templateUrl: './admin-product-list.component.html',
	styleUrls: ['./admin-product-list.component.scss'],
	encapsulation: ViewEncapsulation.None, // Để sử dụng Bootstrap styles
})
export class AdminProductListComponent implements OnInit {
	constructor(
		private adminProductService: AdminProductService,
		private categoryService: CategoryService,
		private router: Router
	) {}

	
	pagedProducts!: PageResponse<ProductResponse>;
	products: ProductResponse[] = [];

	categoryList: category[] = [];

	ProductStatusType = ProductStatusType;

	pageRequest!: PageRequest;

	sortMap: { [key: string]: SortDirection } = {
		name: 'none',
		price: 'none',
		categories: 'none',
	};
	filterMap: { [key: string]: any } = {
		categoryId: null, // Lọc theo categoryId nếu cần
	};
	productNameSearch: string = ''; // Biến để lưu giá trị tìm kiếm theo tên sản phẩm

	ngOnInit() {
		this.pageRequest = {
			page: 0, // Bắt đầu từ trang 0
			size: 30, // Số lượng sản phẩm trên mỗi trang
			sortMap: this.sortMap, // Sắp xếp theo id theo thứ tự tăng dần
			filterMap: this.filterMap, // Thêm filterMap vào pageRequest
		};
		this.adminProductService.getAll(this.pageRequest).subscribe(data => {
			console.log('data', data);
			this.pagedProducts = data;
			this.products = data.content;
		});
		this.categoryService.getAll().subscribe(categories => {
			this.categoryList = categories;
			console.log('categoryList', this.categoryList);
		});
	}
	loadData() {
		this.adminProductService.getAll(this.pageRequest).subscribe(data => {
			this.pagedProducts = data;
			this.products = data.content;
		});
	}
	// mảng chứa các trang
	getPageArray(): number[] {
		return Array.from(
			{ length: this.pagedProducts.page.totalPages },
			(_, i) => i + 1
		);
	}
	// Chuyển trang
	changePage(page: number): void {
		console.log('changePage', page);
		this.pageRequest.page = page - 1; // Giảm 1 vì API thường bắt đầu từ trang 0
		this.loadData();
	}

	// sortMap: { [key: string]: 'asc' | 'desc' | 'none' } = {
	// 	name: 'none',
	// 	price: 'none',
	// 	createdDate: 'none',
	// };

	sortBy(field: string) {
		if (this.sortMap[field] === 'none') {
			this.sortMap[field] = 'asc';
		} else if (this.sortMap[field] === 'asc') {
			this.sortMap[field] = 'desc';
		} else {
			this.sortMap[field] = 'none';
		}
		// Cập nhật sort trong pageRequest
		this.loadData(); // Gọi API hoặc load lại dữ liệu
	}
	fillBy(field: string) {}

	getSortIcon(field: string): string {
		if (this.sortMap[field] === 'none') {
			return 'bi bi-chevron-expand';
		}
		return this.sortMap[field] === 'asc' ? 'bi bi-sort-up' : 'bi bi-sort-down';
	}

	// lọc theo giá
	filterMinPrice: number | null = null;
	filterMaxPrice: number | null = null;

	applyPriceFilter() {
		const min = this.filterMinPrice ?? 0;
		const max = this.filterMaxPrice ?? Number.MAX_VALUE;

		console.log(`Lọc giá từ ${min} đến ${max}`);
		// Gọi API hoặc xử lý filter danh sách
		this.filterMap = {
			minPrice: min,
			maxPrice: max,
		};
		this.pageRequest.filterMap = this.filterMap; // Cập nhật filterMap trong pageRequest
		this.loadData(); // Gọi lại API để lấy dữ liệu đã lọc
	}

	// lọc theo danh mục

	filterCategoryIds: number[] = [];

	applyCategoryFilter() {
		console.log('Danh mục được chọn:', this.filterCategoryIds);
		this.filterMap['categoryId'] = this.filterCategoryIds;
		this.pageRequest.filterMap = this.filterMap;
		document.body.click();
	
		this.loadData(); // gọi lại API
	}
	searchProducts() {
		console.log('Tìm kiếm sản phẩm với tên:', this.productNameSearch);
		this.filterMap['name'] = this.productNameSearch; // Thêm điều kiện tìm kiếm vào filterMap
		this.pageRequest.filterMap = this.filterMap; // Cập nhật filterMap trong pageRequest
		this.loadData(); // Gọi lại API để lấy dữ liệu đã lọc
	}

	
}
