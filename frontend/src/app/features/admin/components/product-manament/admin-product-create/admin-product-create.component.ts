import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, NgSelectOption, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { category } from '../../../models/category';
import { Route, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../../service/category.service';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  standalone: true,
  imports: [FormsModule  , ReactiveFormsModule, NgFor, NgSelectModule],
  selector: 'app-admin-product-create',
  templateUrl: './admin-product-create.component.html',
  styleUrls: ['./admin-product-create.component.scss']
})
export class AdminProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  categoryList: category[] = []; // Load từ API
  previewImages: string[] = [];

  constructor(private fb: FormBuilder, private router: Router, private CategoryService: CategoryService) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0],
      status: ['còn hàng'],
      categories: [[]],
      description: [''],
      imagesUrl: [[]]
    });

    // TODO: gọi API để lấy danh mục
    this.CategoryService.getAll().subscribe(data => this.categoryList = data);
  }

  onImageSelected(event: any) {
    const {files} = event.target;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.previewImages.push(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      console.log('Dữ liệu gửi đi:', productData);
      // TODO: gửi dữ liệu + ảnh lên backend
    }
  }

  goBack() {
    this.router.navigate(['/admin/product-management/product-list']);
  }
}
