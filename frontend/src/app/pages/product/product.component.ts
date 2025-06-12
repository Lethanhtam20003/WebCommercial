import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../../features/product/product-list/product-list.component';
import { RouterOutlet } from '@angular/router';
import { ProductList2Component } from '../../features/product/product-list2/product-list2.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryResponse } from '../../core/models/response/product-response/CategoryResponse';
import { Promotion } from '../../core/models/response/product-response/Promotion';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ProductListComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  filterForm!: FormGroup;
  isCollapsed = false;

  categories: CategoryResponse[] = []; // gọi API để load danh mục
  promotions: Promotion[] = []; // gọi API để load khuyến mãi

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: [''],
      minPrice: [null],
      maxPrice: [null],
      categoryId: [[]],
      promotionId: [null],
      status: [''],
      sortByPrice: ['']
    });

    // gọi API load danh mục, khuyến mãi nếu cần
  }

  applyFilters(): void {
    const filterData = this.filterForm.value;
    // emit hoặc gọi service để tìm sản phẩm
    console.log('Filter:', filterData);
  }

  resetFilters(): void {
    this.filterForm.reset({
      name: '',
      minPrice: null,
      maxPrice: null,
      categoryId: [],
      promotionId: null,
      status: '',
      sortByPrice: ''
    });
  }

}
