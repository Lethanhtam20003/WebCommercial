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
import { DynamicFormModalComponentComponent } from '../../../../dynamic-form-modal-component/dynamic-form-modal-component.component';
import { DynamicField } from '../../../../dynamic-form-modal-component/dynamic-field.interface';
import { CreateCategoryRequest } from '../../../../core/models/request/category/create-category-request.interface';
import {
	AlertService,
	ModalInputField,
} from '../../../../core/service/alert.service';
import { CloudinaryUploadService } from '../../service/cloudinary-upload.service';
import { UpdateCategoryRequest } from '../../../../core/models/request/category/update-category-request.interface';

@Component({
	selector: 'app-category-management',
	imports: [CommonModule, NgIf, PaginationComponent, GenericFilterComponent],
	providers: [CloudinaryUploadService],
	templateUrl: './category-management.component.html',
	styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent implements OnInit {
	categories: CategoriesAdminFilterResponse[] = [];
	currentPage: number = 1;
	pageSize: number = 10;
	totalPages: number = 1;
	showFilter = false;

	field: FilterField[] = [
		{ name: 'name', label: 'Tên danh mục', type: 'text' },
		{ name: 'description', label: 'Mô tả', type: 'text' },
	];

	categoryFields: DynamicField[] = [
		{ name: 'name', label: 'Tên danh mục', type: 'text', required: true },
		{ name: 'description', label: 'Mô tả', type: 'textarea' },
		{
			name: 'status',
			label: 'Trạng thái',
			type: 'select',
			options: ['ACTIVE', 'INACTIVE'],
		},
	];

	filterValues: Partial<CategoriesAdminFilterResponse> = {};

	constructor(
		private categoryService: CategoryService,
		private alert: AlertService,
		private cloudinary: CloudinaryUploadService
	) {}

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

	private buildCategoryFormFields(
		category?: CategoriesAdminFilterResponse
	): ModalInputField[] {
		return [
			{
				label: 'Tên danh mục',
				name: 'name',
				required: true,
				value: category?.name || '',
			},
			{
				label: 'Mô tả',
				name: 'description',
				type: 'textarea',
				value: category?.description || '',
			},
			{
				label: category ? 'Ảnh đại diện (nếu muốn thay)' : 'Ảnh đại diện',
				name: 'imageUrl',
				type: 'file',
				required: !category, // bắt buộc khi tạo mới, không bắt khi cập nhật
			},
		];
	}

	async openAddCategory() {
		const data = await this.alert.showForm(
			'Thêm danh mục',
			this.buildCategoryFormFields()
		);

		if (!data) return;

		// 👇 Bắt đầu upload ảnh nếu là File
		let imageUrl: string | undefined;
		const imageFile = data['imageUrl'];

		if (imageFile instanceof File) {
			try {
				imageUrl = await this.cloudinary.uploadImage(imageFile);
			} catch (err) {
				this.alert.error('Lỗi khi upload ảnh');
				return;
			}
		} else {
			this.alert.error('Ảnh không hợp lệ');
			return;
		}

		// Lúc này data.imageUrl chính là URL của Cloudinary
		const request: CreateCategoryRequest = {
			name: data['name'] as string,
			description: data['description'] as string,
			imageUrl: imageUrl,
		};

		this.categoryService.createCategory(request).subscribe({
			next: res => {
				console.log('✅ Tạo danh mục thành công:', res.result);
				this.loadCategories();
			},
			error: err => {
				console.error('❌ Lỗi khi tạo danh mục:', err);
			},
		});
	}
	toggleFilter() {
		this.showFilter = !this.showFilter;
	}

	async openEditCategory(category: CategoriesAdminFilterResponse) {
		const data = await this.alert.showForm(
			'Cập nhật danh mục',
			this.buildCategoryFormFields(category)
		);

		if (!data) return;

		let imageUrl = category.imageUrl;
		const imageFile = data['imageUrl'];

		if (imageFile instanceof File) {
			try {
				imageUrl = await this.cloudinary.uploadImage(imageFile);
			} catch (err) {
				this.alert.error('Lỗi khi upload ảnh mới');
				return;
			}
		}

		const updateRequest: UpdateCategoryRequest = {
			id: category.id,
			name: data['name'] as string,
			description: data['description'] as string,
			imageUrl: imageUrl,
		};

		this.categoryService.updateCategory(updateRequest).subscribe({
			next: res => {
				this.alert.success('Cập nhật danh mục thành công');
				this.loadCategories();
			},
			error: err => {
				console.error('❌ Lỗi khi cập nhật danh mục:', err);
				this.alert.error('Không thể cập nhật danh mục');
			},
		});
	}

	async confirmDeleteCategory(id: number) {
		const confirmed = await this.alert.confirm(
			'Bạn có chắc chắn muốn xóa danh mục này?',
			'Xác nhận xóa'
		);

		if (!confirmed) return;

		this.categoryService.deleteCategory(id).subscribe({
			next: () => {
				this.alert.success('Đã xóa danh mục thành công');
				this.loadCategories();
			},
			error: err => {
				console.error('❌ Lỗi khi xóa danh mục:', err);
				this.alert.error('Không thể xóa danh mục');
			},
		});
	}
}
