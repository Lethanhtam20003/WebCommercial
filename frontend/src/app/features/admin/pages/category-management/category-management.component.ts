import { Component, OnInit } from '@angular/core';
import { CategoriesAdminFilterResponse } from '../../../../core/models/response/category/categories-admin-filter-response.interface';
import { CategoryService } from '../../service/admin-category.service';
import { CategoriesAdminFilterRequest } from '../../../../core/models/request/category/categories-admin-filter-request.interface';
import { catchError, of } from 'rxjs';
import { Page } from '../../../../core/models/response/page-response.interface';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { FilterField } from '../../../../shared/components/generic-filter/generic-filter-field.interface';
import { CommonModule, NgIf } from '@angular/common';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { GenericFilterComponent } from '../../../../shared/components/generic-filter/generic-filter.component';

@Component({
	selector: 'app-category-management',
	imports: [CommonModule, NgIf, PaginationComponent, GenericFilterComponent],
	templateUrl: './category-management.component.html',
	styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent implements OnInit {
	categories: CategoriesAdminFilterResponse[] = [];
	currentPage: number = 1;
	pageSize: number = 10;
	totalPages: number = 1;

	field: FilterField[] = [
		{ name: 'name', label: 'Tên danh mục', type: 'text' },
		{ name: 'description', label: 'Mô tả', type: 'text' },
	];
	filterValues: Partial<CategoriesAdminFilterResponse> = {};

	constructor(private categoryService: CategoryService) {}

	ngOnInit() {
		this.loadCategories();
	}
	loadCategories(): void {
		const cleanedFilterValues = Object.fromEntries(
			Object.entries(this.filterValues || {}).map(([key, value]) => [
				key,
				typeof value === 'string' ? value.trim() : value,
			])
		);

		this.categoryService
			.filterCategories({
				page: this.currentPage < 0 ? 0 : this.currentPage - 1,
				size: this.pageSize,
				...cleanedFilterValues,
			})
			.pipe(
				catchError(error => {
					console.error('❌ Lỗi khi tải danh mục:', error);
					return of({
						result: {
							content: [],
							page: {
								totalPages: 0,
								totalElements: 0,
								size: 0,
								number: 0,
							},
						},
					} as ApiResponse<Page<CategoriesAdminFilterResponse>>);
				})
			)
			.subscribe((res: ApiResponse<Page<CategoriesAdminFilterResponse>>) => {
				this.categories = res.result.content;
				this.totalPages = res.result.page.totalPages;
			});
	}
	onFilterChanged(values: Record<string, any>) {
		this.filterValues = values;
		this.currentPage = 1;
		this.loadCategories();
	}
	onPageChange(page: number) {
		this.currentPage = page;
		this.loadCategories();
	}
}
