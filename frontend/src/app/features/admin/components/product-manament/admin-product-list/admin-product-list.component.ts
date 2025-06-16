import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AdminProductService } from '../../../service/admin-product.service';
import { ProductResponse } from '../../../../../core/models/response/product-response/productResponse';
import { ProductStatusType } from '../../../models/product-status.enum';
import { PageResponse } from '../../../../../core/models/response/product-response/product-response/page-response.interface';
import {
	PageRequest,
	SortDirection,
} from '../../../models/request/pageRequest.interface';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoryService } from '../../../service/admin-category.service';
import { category } from '../../../../../core/models/response/product-response/category';
import { CustomNgSelectComponent } from '../../../../../shared/components/custom-ng-select/custom-ng-select.component';
import { Page } from '../../../../../core/models/response/product-response/product-response/Page.interface';

@Component({
	standalone: true,
	imports: [
		FormsModule,
		CommonModule,
		RouterLink,
		RouterModule,
		NgIf,
		NgSelectModule,
		CustomNgSelectComponent,
	],
	selector: 'app-admin-product-list',
	templateUrl: './admin-product-list.component.html',
	styleUrls: ['./admin-product-list.component.scss'],
	encapsulation: ViewEncapsulation.None, // Để sử dụng Bootstrap styles
})
export class AdminProductListComponent implements OnInit {
	pagedProducts!: PageResponse<ProductResponse>;
	products: ProductResponse[] = [];
	categoryList: category[] = [];
	pageRequest!: PageRequest;

	ProductStatusType = ProductStatusType;

	constructor(
		private adminProductService: AdminProductService,
		private categoryService: CategoryService,
		private router: Router
	) {}
	ngOnInit() {
		this.categoryService.getAll().subscribe(categories => {
			this.categoryList = categories;
		});

		this.pageRequest = {
			page: 0, // Bắt đầu từ trang 0
			size: 30, // Số lượng sản phẩm trên mỗi trang
			sortMap: this.sortMap, // Sắp xếp theo id theo thứ tự tăng dần
			filterMap: this.filterMap, // Thêm filterMap vào pageRequest
		};
		this.adminProductService.getAll(this.pageRequest).subscribe(data => {
			this.pagedProducts = data;
			this.products = data.content;
		});
	}
	productNameSearch: string = ''; // Biến để lưu giá trị tìm kiếm theo tên sản phẩm
	filterMinPrice: number | null = null; // Biến để lưu giá trị lọc giá tối thiểu
	filterMaxPrice: number | null = null; // Biến để lưu giá trị lọc giá tối đa
	filterCategoryIds: number[] = []; // Biến để lưu danh sách các categoryId đã chọn
	productStatusSelected: String = '';
	softOptions = [
		{ key: 'name', label: 'Tên' },
		{ key: 'price', label: 'Giá' },
		{ key: 'id', label: 'ID' },
	]; // Danh sách các tùy chọn sắp xếp
	typeSoftOptions = [
		{ key: 'asc', label: 'Tăng dần' },
		{ key: 'desc', label: 'Giảm dần' },
		{ key: 'none', label: 'Không sắp xếp' },
	]; // Các giá trị sắp xếp có thể chọn

	softOptionSelected: string = 'id';
	typeSoft: SortDirection = 'none'; // Biến để lưu giá trị sắp xếp theo tên, giá hoặc id

	sortMap: { [key: string]: SortDirection } = {
		name: 'none',
		price: 'none',
		id: 'none',
	};
	filterMap: { [key: string]: any } = {
		categoryId: null, // Lọc theo categoryId nếu cần
		name: null, // Lọc theo tên sản phẩm
	};

	loadData() {
		this.adminProductService.getAll(this.pageRequest).subscribe(data => {
			this.pagedProducts = data;
			this.products = data.content;
		});
	}
	searchProducts() {
		this.filterMap['name'] = this.productNameSearch; // Thêm điều kiện tìm kiếm vào filterMap
		this.pageRequest.filterMap = this.filterMap; // Cập nhật filterMap trong pageRequest
		this.loadData(); // Gọi lại API để lấy dữ liệu đã lọc
	}

	applyPriceFilter() {
		const min = this.filterMinPrice ?? 0;
		const max = this.filterMaxPrice ?? Number.MAX_VALUE;

		console.log(`Lọc giá từ ${min} đến ${max}`);
		this.filterMap['minPrice'] = min;
		this.filterMap['maxPrice'] = max;
	}

	applyCategoryFilter() {
		console.log('Danh mục được chọn:', this.filterCategoryIds);
		this.filterMap['categoryId'] = this.filterCategoryIds;
		document.body.click();
	}
	applyProductStatusFilter() {
		console.log('Danh mục được chọn:', this.productStatusSelected);
		this.filterMap['status'] = this.productStatusSelected;
	}

	applySort() {
		this.sortMap[this.softOptionSelected] = this.typeSoft;
	}
	applyAllFilters() {
		this.applyPriceFilter();
		this.applyCategoryFilter();
		this.applyProductStatusFilter();
		this.applySort();
		this.pageRequest.sortMap = this.sortMap;
		this.pageRequest.filterMap = this.filterMap;

		this.loadData(); // Gọi lại API để lấy dữ liệu đã lọc
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

	showFilter = false;

	toggleFilterVisible() {
		this.showFilter = !this.showFilter;
	}
}
