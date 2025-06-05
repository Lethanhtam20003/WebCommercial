import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AdminProductService } from '../../../service/admin-product.service';
import { ProductResponse } from '../../../../../core/models/response/product-response/productResponse';
import { ProductStatusType } from '../../../models/product-status.enum';
import { PageResponse } from '../../../models/product-response/page-response.interface';
import { PageRequest, SortDirection } from '../../../models/request/pageRequest.interface';

@Component({
	standalone: true,
	imports: [FormsModule, CommonModule, RouterLink],
	selector: 'app-admin-product-list',
	templateUrl: './admin-product-list.component.html',
	styleUrls: ['./admin-product-list.component.scss'],
})
export class AdminProductListComponent implements OnInit {
	constructor(
		private adminProductService: AdminProductService,
		private router: Router
	) {}

	ProductStatusType = ProductStatusType;

	pagedProducts!: PageResponse<ProductResponse>;
	products: ProductResponse[] = [];

	pageRequest!: PageRequest;

	sortMap : { [key: string]: SortDirection } = {
		name: 'none',
		price: 'none',
		categories: 'none',
	};

	ngOnInit() {
		this.pageRequest = {
			page: 0, // Bắt đầu từ trang 0
			size: 30, // Số lượng sản phẩm trên mỗi trang
			sortMap: this.sortMap, // Sắp xếp theo id theo thứ tự tăng dần
		};
		this.adminProductService.getAll(this.pageRequest).subscribe(data => {
			console.log('data', data);
			this.pagedProducts = data;
			this.products = data.content;
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
		this.pageRequest.page = page -1; // Giảm 1 vì API thường bắt đầu từ trang 0
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
	fillBy(field: string)  {
		
	}

	
	getSortIcon(field: string): string {
		if (this.sortMap[field] === 'none') {
			return 'bi bi-chevron-expand';
		}
		return this.sortMap[field] === 'asc' ? 'bi bi-sort-up' : 'bi bi-sort-down';
	}
}
