import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../../features/product/product-list/product-list.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryResponse } from '../../core/models/response/product-response/CategoryResponse';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../features/admin/service/admin-category.service';
import { PromotionService } from '../../core/service/product/Promotion.service';
import { ProductFilter } from '../../core/models/request/filter/productFilter';
import { CustomNgSelectComponent } from '../../shared/components/custom-ng-select/custom-ng-select.component';
import { PromotionResponse } from '../../core/models/response/product-response/PromotionResponse';

@Component({
  standalone: true,
  imports: [
    ProductListComponent,
    CommonModule,
    ReactiveFormsModule,
    CustomNgSelectComponent,
    
  ],
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  filterForm!: FormGroup;
  isCollapsed = true;

  categories: CategoryResponse[] = []; // gọi API để load danh mục
  promotions: PromotionResponse[] = []; // gọi API để load khuyến mãi

  productFilter: ProductFilter = {
    page: 0,
    size: 16,
  }; 

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private promotionService: PromotionService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: [''],
      minPrice: [null],
      maxPrice: [null],
      categoryId: [[]],
      promotionId: [null],
      status: [null],
      sortByPrice: ['']
    });
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
    this.promotionService.getAll().subscribe(res => {
      this.promotions = res.result;
      console.log(this.promotions);
    });
    // gọi API load danh mục, khuyến mãi nếu cần
  }

  applyFilters(): void {
    const filterData = this.filterForm.value;
    this.productFilter = filterData;

    // emit hoặc gọi service để tìm sản phẩm
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
