import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { category } from '../../../models/category';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../../service/admin-category.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CloudinaryUploadService } from '../../../service/cloudinary-upload.service';
import { AlertService } from '../../../../../core/service/alert.service';
import { AdminProductService } from '../../../service/admin-product.service';
import { ValidNameValidator } from '../../../ValidationCustom/ValidName.validator';
import { ProductRequest } from '../../../models/ProductRequest';
import { ProductResponse } from '../../../../../core/models/productResponse';
import { ApiResponse } from '../../../../../core/models/api-response.model';
@Component({
	standalone: true,
	imports: [ReactiveFormsModule, NgFor, NgSelectModule, NgIf],
	selector: 'app-admin-product-create',
	templateUrl: './admin-product-create.component.html',
	styleUrls: ['./admin-product-create.component.scss'],
})
export class AdminProductCreateComponent implements OnInit {
	productForm!: FormGroup;
	categoryList: category[] = [
		{
			id: 1,
			name: 'Thời trang',
			imageUrl: 'https://example.com/image1.jpg',
			description: 'Mô tả danh mục thời trang',
		},
	];
	ImageUrls: string[] = [];
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private CategoryService: CategoryService,
		private cloudinary: CloudinaryUploadService,
		private alertService: AlertService,
		private productService: AdminProductService // TODO: Thay thế bằng service thực tế
	) {}

	ngOnInit() {
		this.productForm = this.fb.group({
			name: [
				'',
				{
					validators: [Validators.required],
					asyncValidators: [ValidNameValidator(this.productService)],
					updateOn: 'blur', // Chỉ kiểm tra khi mất focus
				},
			],
			price: [0, [Validators.required, Validators.min(0)]],
			status: ['mở bán'],
			categories: [[], Validators.required],
			description: [''],
			imagesUrl: [[]],
		});

		// TODO: gọi API để lấy danh mục
		this.CategoryService.getAll().subscribe(data => (this.categoryList = data));
	}

	onImageSelected(event: any) {
		const files: File[] = Array.from(event.target.files);
		for (const file of files) {
			this.cloudinary.uploadImage(file).then(url => {
				this.ImageUrls.push(url);
			});
		}
	}
	/** Thêm ảnh từ URL **/
	addImageUrl(input: HTMLInputElement): void {
		const url = input.value.trim();
		if (!url || !this.isImageUrl(url)) {
			input.value = ''; // Xóa giá trị input nếu không hợp lệ
			this.alertService.error('URL không hợp lệ hoặc không phải là ảnh');
			return;
		}
		this.ImageUrls.push(url);
		// Cập nhật form control
		this.productForm.patchValue({ imagesUrl: this.ImageUrls });
		input.value = ''; // Xóa giá trị input sau khi thêm
	}
	onSubmit() {
		if (this.productForm.valid) {
			const productRequest: ProductRequest = {
				name: this.productForm.value.name,
				price: this.productForm.value.price,
				status: this.productForm.value.status,
				categoryIds: this.productForm.value.categories.map((category: category) => category.id),
				description: this.productForm.value.description,
				image: this.ImageUrls,
			}
			this.productService.createProduct(productRequest).subscribe({
				next: (response: ApiResponse<ProductResponse>) => {
					this.alertService.success('Thêm sản phẩm thành công');
					this.router.navigate(['/admin/product-management/product-list']);
				},
				error: error => {
					this.alertService.error('Thêm sản phẩm thất bại');
				}
			});
		}
	}
	isImageUrl(url: string): boolean {
		// Regex kiểm tra đuôi file, cho phép cả query string phía sau
		return /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff?)($|\?)/i.test(url);
	}

	goBack() {
		this.router.navigate(['/admin/product-management/product-list']);
	}
}
