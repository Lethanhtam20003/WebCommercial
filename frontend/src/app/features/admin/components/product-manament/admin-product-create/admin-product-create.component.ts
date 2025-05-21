import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	NgModel,
	NgSelectOption,
	ReactiveFormsModule,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { category } from '../../../models/category';
import { Route, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../../service/category.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CloudinaryUploadService } from '../../../service/cloudinary-upload.service';
@Component({
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgFor, NgSelectModule],
	selector: 'app-admin-product-create',
	templateUrl: './admin-product-create.component.html',
	styleUrls: ['./admin-product-create.component.scss'],
})
export class AdminProductCreateComponent implements OnInit {
	productForm!: FormGroup;
	categoryList: category[] = []; // Load từ API
	previewImages: string[] = [];
  uploadedImageUrls: string[] = [];
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private CategoryService: CategoryService,
    private cloudinary: CloudinaryUploadService
	) {}

	ngOnInit() {
		this.productForm = this.fb.group({
			name: ['', Validators.required],
			price: [0],
			status: ['còn hàng'],
			categories: [[]],
			description: [''],
			imagesUrl: [[]],
		});

		// TODO: gọi API để lấy danh mục
		this.CategoryService.getAll().subscribe(data => (this.categoryList = data));
	}

	onImageSelected(event: any) {
		const files: File[] = Array.from(event.target.files);
    this.previewImages = [];
    this.uploadedImageUrls = [];

    for (const file of files) {
      this.cloudinary.uploadImage(file).then(url => {
        this.uploadedImageUrls.push(url);
        this.previewImages.push(url);
      });
    }
	}

	onSubmit() {
		if (this.productForm.valid) {
			const productData = this.productForm.value;
			console.log('Dữ liệu gửi đi:', productData);
			// TODO: gửi dữ liệu + ảnh lên backend
      const payload = {
      ...this.productForm.value,
      images: this.uploadedImageUrls
      };
      console.log(payload);
    // this.productService.create(payload).subscribe(...);
		}
	}

	goBack() {
		this.router.navigate(['/admin/product-management/product-list']);
	}
}
